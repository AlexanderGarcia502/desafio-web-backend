import { Order } from "../../entities/order";
import {
  IDecideOrderProps,
  IOrderRepository,
} from "../repositories/order-repository-interface";

export type IOrderWithNullableProps = Required<Pick<Order, "idOrden">> & {
  [K in keyof Omit<Order, "idOrden" | "usuarios_idUsuarios">]: Order[K] | null;
};

export default class DecideOrder {
  private orderRepository: IOrderRepository;
  private decideOrder: IDecideOrderProps;

  constructor(
    orderRepository: IOrderRepository,
    decideOrder: IDecideOrderProps
  ) {
    this.orderRepository = orderRepository;
    this.decideOrder = decideOrder;
  }
  execute() {
    const getOrder = this.orderRepository.decideOrder(this.decideOrder);
    return getOrder;
  }
}
