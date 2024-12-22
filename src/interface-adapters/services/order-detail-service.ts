import { OrderDetail } from "../../entities/order-detail";
import SaveOrderDetail from "../../use-cases/order-detail/saveOrderDetail";
import { IOrderDetailRepository } from "../../use-cases/repositories/order-detail-repository-interface";

export class OrderDetailService {
  private orderDetailRepository: IOrderDetailRepository;
  constructor(orderDetailRepository: IOrderDetailRepository) {
    this.orderDetailRepository = orderDetailRepository;
  }
  save(orderDetailInfo: OrderDetail) {
    const saveOrderDetail = new SaveOrderDetail(
      this.orderDetailRepository,
      orderDetailInfo
    );
    return saveOrderDetail.execute();
  }
}
