import { OrderDetail } from "../../entities/order-detail";

export interface ISaveOrderDetail extends Pick<OrderDetail, "orden_idOrden"> {
  productsDetails: Omit<OrderDetail, "orden_idOrden">[];
}

export interface IOrderDetailRepository {
  saveOrderDetail: (order: ISaveOrderDetail) => void;
}
