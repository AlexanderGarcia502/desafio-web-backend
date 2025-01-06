import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { IOrderWithNullableProps } from "../order/updateOrder";

export interface ISaveOrderResult {
  idOrden: number;
}

export interface IOrderWithDetails
  extends Pick<
    Order,
    "idOrden" | "nombre_completo" | "direccion" | "total_orden"
  > {
  detallesOrden: string;
}

export interface IOrderRepository {
  saveOrder: (order: Order) => Promise<ISaveOrderResult>;
  updateOrder: (order: IOrderWithNullableProps) => void;
  getOrderList: () => Promise<IOrderWithDetails> | any;
}
