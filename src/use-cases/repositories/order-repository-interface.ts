import { Order } from "../../entities/order";
import { IOrderWithNullableProps } from "../order/updateOrder";

export interface IOrderRepository {
  saveOrder: (order: Order) => void;
  updateOrder: (order: IOrderWithNullableProps) => void;
}
