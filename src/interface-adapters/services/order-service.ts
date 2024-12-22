import { Order } from "../../entities/order";
import SaveOrder from "../../use-cases/order/saveOrder";
import UpdateOrder, {
  IOrderWithNullableProps,
} from "../../use-cases/order/updateOrder";
import { IOrderRepository } from "../../use-cases/repositories/order-repository-interface";

export class OrderService {
  private orderRepository: IOrderRepository;
  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }
  save(orderInfo: Order) {
    const saveOrder = new SaveOrder(this.orderRepository, orderInfo);
    return saveOrder.execute();
  }
  update(orderInfo: IOrderWithNullableProps) {
    const updateOrder = new UpdateOrder(this.orderRepository, orderInfo);
    return updateOrder.execute();
  }
}
