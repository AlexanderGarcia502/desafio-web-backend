import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IRolRepository } from "../../../use-cases/repositories/rol-repository-interface";
import { Rol } from "../../../entities/rol";
import { IRolPropertiesRequiredProps } from "../../../use-cases/rol/updateRol";
import { IRolPropertiesForDelete } from "../../../use-cases/rol/deleteRol";

export class RolRepository implements IRolRepository {
  async saveRol({ idUsuarios, nombre }: Rol) {
    try {
      await sequelize.query(
        "EXEC p_insertarRol @idUsuarios = :idUsuarios, @nombre = :nombre",
        {
          replacements: { idUsuarios, nombre },
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
  async updateRol({ idRol, idUsuarios, nombre }: IRolPropertiesRequiredProps) {
    try {
      await sequelize.query(
        "EXEC p_actualizarRol @idRol = :idRol, @idUsuarios = :idUsuarios, @nombre = :nombre",
        {
          replacements: { idRol, idUsuarios, nombre },
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
  async deleteRol({ idUsuarios, idRol }: IRolPropertiesForDelete) {
    try {
      await sequelize.query("EXEC p_eliminarRol :idUsuarios, :idRol", {
        replacements: { idUsuarios, idRol },
        type: QueryTypes.RAW,
      });
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
