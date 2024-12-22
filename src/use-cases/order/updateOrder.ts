import { Verifier } from "../../../utils/verifier";
import { Order } from "../../entities/order";
import { IOrderRepository } from "../repositories/order-repository-interface";

export type IOrderWithNullableProps = Required<Pick<Order, "idOrden">> & {
  [K in keyof Omit<Order, "idOrden" | "usuarios_idUsuarios">]: Order[K] | null;
};

export default class UpdateOrder {
  private orderRepository: IOrderRepository;
  private orderInfo: IOrderWithNullableProps;
  private verifier = new Verifier();

  constructor(
    orderRepository: IOrderRepository,
    orderInfo: IOrderWithNullableProps
  ) {
    this.orderRepository = orderRepository;
    this.orderInfo = orderInfo;
  }
  execute() {
    const { nombre_completo, direccion, telefono, correo_electronico } =
      this.orderInfo;

    if (
      (nombre_completo && this.verifier.isEmpty({ value: nombre_completo })) ||
      (direccion && this.verifier.isEmpty({ value: direccion })) ||
      (telefono && this.verifier.isEmpty({ value: telefono })) ||
      (correo_electronico &&
        this.verifier.isEmpty({ value: correo_electronico }))
    ) {
      throw new Error("Todas las casillas son requeridas.");
    }

    if (
      nombre_completo &&
      this.verifier.isEmpty({ value: nombre_completo, min: 8 })
    ) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }
    if (
      correo_electronico &&
      this.verifier.isEmail(correo_electronico) === false
    ) {
      throw new Error("El correo electrónico no es válido");
    }
    if (telefono && this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }

    const updateOrder = this.orderRepository.updateOrder(this.orderInfo);
    return updateOrder;
  }
}
