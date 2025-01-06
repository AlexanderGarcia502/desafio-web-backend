import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import SaveOrder from "../../use-cases/order/saveOrder";
import UpdateOrder, {
  IOrderWithNullableProps,
} from "../../use-cases/order/updateOrder";
import { IOrderDetailRepository } from "../../use-cases/repositories/order-detail-repository-interface";
import { IOrderRepository } from "../../use-cases/repositories/order-repository-interface";

export class OrderService {
  private orderRepository: IOrderRepository;
  private orderDetailRepository: IOrderDetailRepository;

  constructor(
    orderRepository: IOrderRepository,
    orderDetailRepository: IOrderDetailRepository
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
  }
  save(orderInfo: Order & Pick<OrderDetail, "productsDetails">) {
    const saveOrder = new SaveOrder(
      this.orderRepository,
      this.orderDetailRepository,
      orderInfo
    );
    return saveOrder.execute();
  }
  update(orderInfo: IOrderWithNullableProps) {
    const updateOrder = new UpdateOrder(this.orderRepository, orderInfo);
    return updateOrder.execute();
  }
}
