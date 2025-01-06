import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../../../entities/user";
import {
  ILoginReturn,
  IUserRepository,
} from "../../../use-cases/repositories/user-repository-interface";
import { sequelize } from "../../shared/database/connect";
import { IUserWithNullableProps } from "../../../use-cases/user/updateUser";
import { IUserPropertiesForDelete } from "../../../use-cases/user/deleteUser";
import { ICredentials } from "../../../use-cases/user/login";
import { controlError } from "../../../../utils/controlError";

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
      return controlError(err);
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
      return controlError(err);
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
      return controlError(err);
    }
  }
  async login({
    correo_electronico,
    password: passwordEntered,
  }: ICredentials): Promise<ILoginReturn> {
    try {
      const result = await sequelize.query(
        "EXEC p_loginUsuario @correo_electronico=:correo_electronico",
        {
          replacements: { correo_electronico },
          type: QueryTypes.SELECT,
        }
      );

      const user = result[0] as Omit<User, "rol_idRol">;

      const isPasswordValid = await bcrypt.compare(
        passwordEntered,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Correo electrónico o contraseña incorrectos");
      }

      const { password, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
      } as ILoginReturn;
    } catch (err) {
      return controlError(err);
    }
  }
}
