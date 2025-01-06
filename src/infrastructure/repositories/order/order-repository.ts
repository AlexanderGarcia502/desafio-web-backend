import { QueryTypes } from "sequelize";
import { sequelize } from "../../shared/database/connect";
import {
  IOrderRepository,
  IOrderWithDetails,
  ISaveOrderResult,
} from "../../../use-cases/repositories/order-repository-interface";
import { Order } from "../../../entities/order";
import { IOrderWithNullableProps } from "../../../use-cases/order/updateOrder";
import { controlError } from "../../../../utils/controlError";

export class OrderRepository implements IOrderRepository {
  async getOrderList() {
    try {
      const result = await sequelize.query(`EXEC p_obtenerOrdenConDetalles`);
      const [ordersWithDetails]: [IOrderWithDetails[], unknown] = result as [
        IOrderWithDetails[],
        unknown
      ];
      const orderMapped = ordersWithDetails.map((order) => ({
        ...order,
        detallesOrden: JSON.parse(order.detallesOrden),
      }));

      return orderMapped;
    } catch (err) {
      console.log("ERR: ", err);
      return controlError(err);
    }
  }

  async saveOrder({
    usuarios_idUsuarios,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
  }: Order) {
    try {
      const result: ISaveOrderResult[] = await sequelize.query(
        `EXEC p_insertarOrden
        @usuario_idUsuario = :usuarios_idUsuarios,
        @nombre_completo = :nombre_completo,
        @direccion = :direccion,
        @telefono = :telefono,
        @correo_electronico = :correo_electronico,
        @fecha_entrega = :fecha_entrega;`,
        {
          replacements: {
            usuarios_idUsuarios,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
          },
          type: QueryTypes.SELECT,
        }
      );
      return result[0];
    } catch (err) {
      return controlError(err);
    }
  }
  async updateOrder({
    idOrden,
    estados_idEstados = null,
    nombre_completo = null,
    direccion = null,
    telefono = null,
    correo_electronico = null,
    fecha_entrega = null,
  }: IOrderWithNullableProps) {
    try {
      await sequelize.query(
        "EXEC p_actualizarOrden :idOrden, :estados_idEstados, :nombre_completo, :direccion, :telefono, :correo_electronico, :fecha_entrega",
        {
          replacements: {
            idOrden,
            estados_idEstados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
          },
          type: QueryTypes.RAW,
        }
      );
    } catch (err) {
      return controlError(err);
    }
  }
}
