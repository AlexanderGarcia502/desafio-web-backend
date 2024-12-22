import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../use-cases/repositories/user-repository-interface";
import { sequelize } from "../../shared/database/connect";
import { IUserWithNullableProps } from "../../../use-cases/user/updateUser";
import { IUserPropertiesForDelete } from "../../../use-cases/user/deleteUser";
import { ICredentials } from "../../../use-cases/user/login";

export class UserRepository implements IUserRepository {
  async saveUser({
    rol_idRol,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
  }: User) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await sequelize.query(
        "exec p_insertarUsuario @idRol = :rol_idRol, @correoElectronico = :correo_electronico, @nombreCompleto = :nombre_completo, @password = :hashedPassword, @telefono = :telefono, @fechaNacimiento = :fecha_nacimiento",
        {
          replacements: {
            rol_idRol,
            correo_electronico,
            nombre_completo,
            hashedPassword,
            telefono,
            fecha_nacimiento,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error("Error en el servidor. No se pudo crear");
      }
    }
  }
  async updateUser({
    idUsuarios,
    rol_idRol = null,
    estados_idEstados = null,
    correo_electronico = null,
    nombre_completo = null,
    password = null,
    telefono = null,
    fecha_nacimiento = null,
  }: IUserWithNullableProps) {
    try {
      await sequelize.query(
        `EXEC p_actualizarUsuario 
          @idUsuarios = :idUsuarios, 
          @idRol = :rol_idRol, 
          @idEstados = :estados_idEstados, 
          @correoElectronico = :correo_electronico, 
          @nombreCompleto = :nombre_completo, 
          @password = :password, 
          @telefono = :telefono, 
          @fechaNacimiento = :fecha_nacimiento`,
        {
          replacements: {
            idUsuarios,
            rol_idRol,
            estados_idEstados,
            correo_electronico,
            nombre_completo,
            password,
            telefono,
            fecha_nacimiento,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error("Error en el servidor. No se pudo actualizar");
      }
    }
  }
  async deleteUser({ idUsuarios }: IUserPropertiesForDelete) {
    try {
      await sequelize.query(
        "EXEC p_eliminarUsuario @idUsuarios = :idUsuarios",
        {
          replacements: { idUsuarios },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error("Error en el servidor. No se pudo eliminar");
      }
    }
  }
  async login({
    correo_electronico,
    password,
  }: ICredentials): Promise<Omit<User, "password">> {
    try {
      const result = await sequelize.query(
        "EXEC p_loginUsuario @correo_electronico=:correo_electronico",
        {
          replacements: { correo_electronico },
          type: QueryTypes.SELECT,
        }
      );

      const user = result[0] as User;

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Correo electrónico o contraseña incorrectos");
      }

      return {
        ...user,
        password: undefined,
      } as Omit<User, "password">;
    } catch (err) {
      console.log("error detallado: ", err);
      if (err.name === "SequelizeDatabaseError") {
        const sqlError = err.original;
        console.log("Mensaje de error desde SQL Server:", sqlError.message);

        console.log("Código de error:", sqlError.code);
        console.log("Número del error:", sqlError.number);
        console.log("Estado del error:", sqlError.state);
        console.log("Pila de errores:", sqlError.stack);

        throw new Error(sqlError);
      } else {
        console.log("Error >> ", err);
        throw new Error(err);
      }
    }
  }
}
