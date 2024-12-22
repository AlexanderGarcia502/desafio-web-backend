import { OrderDetail } from "../../entities/order-detail";

export interface IOrderDetailRepository {
  saveOrderDetail: (order: OrderDetail) => void;
}
