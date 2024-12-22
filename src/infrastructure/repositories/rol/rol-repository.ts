import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IRolRepository } from "../../../use-cases/repositories/rol-repository-interface";
import { Rol } from "../../../entities/rol";
import { IRolPropertiesRequiredProps } from "../../../use-cases/rol/updateRol";

export class RolRepository implements IRolRepository {
  async saveRol({ nombre }: Rol) {
    try {
      await sequelize.query("EXEC p_insertarRol @nombre = :nombre", {
        replacements: { nombre },
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
  async updateRol({ idRol, nombre }: IRolPropertiesRequiredProps) {
    try {
      await sequelize.query(
        "EXEC p_actualizarRol @idRol = :idRol, @nombre = :nombre",
        {
          replacements: { idRol, nombre },
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
}
