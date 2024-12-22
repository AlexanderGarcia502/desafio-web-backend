import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import { OrderDetail } from "../../../entities/order-detail";
import { IOrderDetailRepository } from "../../../use-cases/repositories/order-detail-repository-interface";

export class OrderDetailRepository implements IOrderDetailRepository {
  async saveOrderDetail({ orden_idOrden, productsDetails }: OrderDetail) {
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
