import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { Status } from "../../../entities/status";
import { IStatusRepository } from "../../../use-cases/repositories/status-repository-interface";
import { IStatePropertiesRequiredProps } from "../../../use-cases/status/updateStatus";

export class StatusRepository implements IStatusRepository {
  async saveStatus({ idUsuarios, nombre }: Status) {
    try {
      await sequelize.query(
        "EXEC p_insertarEstado @idUsuarios = :idUsuarios, @nombre = :nombre",
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
  async updateStatus({
    idEstados,
    idUsuarios,
    nombre,
  }: IStatePropertiesRequiredProps) {
    try {
      await sequelize.query(
        "EXEC p_actualizarEstado :idEstados, :idUsuarios, :nombre",
        {
          replacements: {
            idEstados,
            idUsuarios,
            nombre,
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
}
