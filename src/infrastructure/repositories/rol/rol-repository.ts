import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { IRolRepository } from "../../../use-cases/repositories/rol-repository-interface";
import { Rol } from "../../../entities/rol";
import { IRolPropertiesRequiredProps } from "../../../use-cases/rol/updateRol";
import { controlError } from "../../../../utils/controlError";

export class RolRepository implements IRolRepository {
  async saveRol({ nombre }: Rol) {
    try {
      await sequelize.query("EXEC p_insertarRol @nombre = :nombre", {
        replacements: { nombre },
        type: QueryTypes.RAW,
      });
    } catch (err) {
      return controlError(err);
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
      return controlError(err);
    }
  }
}
