import { QueryTypes } from "sequelize";
import { User } from "../../../entities/user";
import { IUserRepository } from "../../../use-cases/repositories/user-repository-interface";
import { sequelize } from "../../shared/database/connect";
import { IUserWithNullableProps } from "../../../use-cases/user/updateUser";
import { IUserPropertiesForDelete } from "../../../use-cases/user/deleteUser";

export class UserRepository implements IUserRepository {
  async saveUser({
    rol_idRol,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    clientes_idClientes,
  }: User) {
    try {
      await sequelize.query(
        "exec p_insertarUsuario :rol_idRol, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :clientes_idClientes",
        {
          replacements: {
            rol_idRol,
            correo_electronico,
            nombre_completo,
            password,
            telefono,
            fecha_nacimiento,
            clientes_idClientes,
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
    clientes_idClientes = null,
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
          @idClientes = :clientes_idClientes, 
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
            clientes_idClientes,
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
        throw new Error("Error en el servidor. No se pudo crear");
      }
    }
  }
  async deleteUser({ idUsuarios, idUserToDelete }: IUserPropertiesForDelete) {
    try {
      await sequelize.query(
        "EXEC p_eliminarUsuario @idUsuarios = :idUsuarios, @idUsuarioAEliminar = :idUserToDelete",
        {
          replacements: { idUsuarios, idUserToDelete },
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
}
