import { IOrderRepository } from "../repositories/order-repository-interface";
  
export default class GetHistoryClient {
  private orderRepository: IOrderRepository;
  private idUsuario: number;

  constructor(orderRepository: IOrderRepository, idUsuario: number) {
    this.orderRepository = orderRepository;
    this.idUsuario = idUsuario;
  }
  execute() {
    const getHistory = this.orderRepository.getHistoryClient(this.idUsuario);
    return getHistory;
  }
}
