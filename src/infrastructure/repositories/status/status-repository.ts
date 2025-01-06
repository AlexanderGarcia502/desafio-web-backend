import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { Status } from "../../../entities/status";
import { IStatusRepository } from "../../../use-cases/repositories/status-repository-interface";
import { IStatePropertiesRequiredProps } from "../../../use-cases/status/updateStatus";
import { controlError } from "../../../../utils/controlError";

export class StatusRepository implements IStatusRepository {
  async saveStatus({ nombre }: Status) {
    try {
      await sequelize.query("EXEC p_insertarEstado @nombre = :nombre", {
        replacements: { nombre },
        type: QueryTypes.RAW,
      });
    } catch (err) {
      return controlError(err);
    }
  }
  async updateStatus({ idEstados, nombre }: IStatePropertiesRequiredProps) {
    try {
      await sequelize.query("EXEC p_actualizarEstado :idEstados, :nombre", {
        replacements: {
          idEstados,
          nombre,
        },
        type: QueryTypes.RAW,
      });
    } catch (err) {
      return controlError(err);
    }
  }
}
