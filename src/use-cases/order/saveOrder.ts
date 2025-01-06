import { Verifier } from "../../../utils/verifier";
import { Order } from "../../entities/order";
import { OrderDetail } from "../../entities/order-detail";
import { IOrderDetailRepository } from "../repositories/order-detail-repository-interface";
import { IOrderRepository } from "../repositories/order-repository-interface";

export default class SaveOrder {
  private orderRepository: IOrderRepository;
  private orderDetailRepository: IOrderDetailRepository;

  private orderInfo: Order & {
    productsDetails: Omit<OrderDetail, "orden_idOrden">[];
  };
  private verifier = new Verifier();

  constructor(
    orderRepository: IOrderRepository,
    orderDetailRepository: IOrderDetailRepository,
    orderInfo: Order & {
      productsDetails: Omit<OrderDetail, "orden_idOrden">[];
    }
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.orderInfo = orderInfo;
  }
  async execute() {
    const {
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      productsDetails,
    } = this.orderInfo;

    if (
      this.verifier.isEmpty({ value: nombre_completo }) ||
      this.verifier.isEmpty({ value: direccion }) ||
      this.verifier.isEmpty({ value: telefono }) ||
      this.verifier.isEmpty({ value: correo_electronico })
    ) {
      throw new Error("Todas las casillas son requeridas.");
    }

    if (this.verifier.isEmpty({ value: nombre_completo, min: 8 })) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }
    if (this.verifier.isEmail(correo_electronico) === false) {
      throw new Error("El correo electrónico no es válido");
    }
    if (this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }

    if (productsDetails.length < 1) {
      throw new Error("No hay productos en su carrito");
    }

    const newOrder = await this.orderRepository.saveOrder(this.orderInfo);

    await this.orderDetailRepository.saveOrderDetail({
      orden_idOrden: newOrder.idOrden,
      productsDetails: productsDetails,
    });
    return newOrder;
  }
}
