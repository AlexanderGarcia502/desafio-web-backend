import { Order } from "../../entities/order";
import { IOrderWithNullableProps } from "../order/updateOrder";

export interface ISaveOrderResult {
  idOrden: number;
}

export interface IOrderRepository {
  saveOrder: (order: Order) => Promise<ISaveOrderResult>;
  updateOrder: (order: IOrderWithNullableProps) => void;
}
