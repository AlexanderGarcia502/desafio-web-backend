import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import {
  IOrderDetailRepository,
  ISaveOrderDetail,
} from "../../../use-cases/repositories/order-detail-repository-interface";
import { controlError } from "../../../../utils/controlError";

export class OrderDetailRepository implements IOrderDetailRepository {
  async saveOrderDetail({ orden_idOrden, productsDetails }: ISaveOrderDetail) {
    try {
      const productsDetailsJSON = JSON.stringify(productsDetails);

      await sequelize.query(
        `EXEC p_insertarOrdenDetalles @idOrden=:orden_idOrden, @productos=:productsDetails`,
        {
          replacements: { orden_idOrden, productsDetails: productsDetailsJSON },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      return controlError(err);
    }
  }
}
