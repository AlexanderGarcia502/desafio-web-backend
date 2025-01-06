import { Order } from "../../entities/order";
import { IOrderRepository } from "../repositories/order-repository-interface";

export type IOrderWithNullableProps = Required<Pick<Order, "idOrden">> & {
  [K in keyof Omit<Order, "idOrden" | "usuarios_idUsuarios">]: Order[K] | null;
};

export default class GetOrderList {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }
  execute() {
    const getOrder = this.orderRepository.getOrderList();
    return getOrder;
  }
}
