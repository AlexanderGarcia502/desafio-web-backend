import { Verifier } from "../../../utils/verifier";
import { Order } from "../../entities/order";
import { IOrderRepository } from "../repositories/order-repository-interface";

export default class SaveOrder {
  private orderRepository: IOrderRepository;
  private orderInfo: Order;
  private verifier = new Verifier();

  constructor(orderRepository: IOrderRepository, orderInfo: Order) {
    this.orderRepository = orderRepository;
    this.orderInfo = orderInfo;
  }
  execute() {
    const { nombre_completo, direccion, telefono, correo_electronico } =
      this.orderInfo;

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

    const saveOrder = this.orderRepository.saveOrder(this.orderInfo);
    return saveOrder;
  }
}
