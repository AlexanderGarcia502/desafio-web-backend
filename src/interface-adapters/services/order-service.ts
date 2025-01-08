import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import DecideOrder from "../../use-cases/order/decideOrder";
import GetOrderList from "../../use-cases/order/getOrderList";
import SaveOrder from "../../use-cases/order/saveOrder";
import UpdateOrder, {
  IOrderWithNullableProps,
} from "../../use-cases/order/updateOrder";
import { IOrderDetailRepository } from "../../use-cases/repositories/order-detail-repository-interface";
import {
  IDecideOrderProps,
  IOrderRepository,
} from "../../use-cases/repositories/order-repository-interface";

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
  save(
    orderInfo: Order & {
      productsDetails: Omit<OrderDetail, "idOrdenDetalles">[];
    }
  ) {
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
  getAll() {
    const getAllOrders = new GetOrderList(this.orderRepository);
    return getAllOrders.execute();
  }
  decideOrder(decideOrderInfo: IDecideOrderProps) {
    const decideOrder = new DecideOrder(this.orderRepository, decideOrderInfo);
    return decideOrder.execute();
  }
}
