import { OrderDetail } from "../../entities/order-detail";
import { IOrderDetailRepository } from "../repositories/order-detail-repository-interface";

export default class SaveOrderDetail {
  private orderDetailRepository: IOrderDetailRepository;
  private orderDetailInfo: OrderDetail;

  constructor(
    orderDetailRepository: IOrderDetailRepository,
    orderInfo: OrderDetail
  ) {
    this.orderDetailRepository = orderDetailRepository;
    this.orderDetailInfo = orderInfo;
  }
  execute() {
    const saveOrderDetail = this.orderDetailRepository.saveOrderDetail(
      this.orderDetailInfo
    );
    return saveOrderDetail;
  }
}
