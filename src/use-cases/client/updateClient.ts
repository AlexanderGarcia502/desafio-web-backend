import { Verifier } from "../../../utils/verifier";
import Client from "../../entities/client";
import { IClientRepository } from "../repositories/client-repository-interface";

export type IClientWithNullableProps = {
  [K in keyof Omit<Client, "usuarios_idUsuarios">]: K extends "idClientes"
    ? Client[K]
    : Client[K] | null;
};

export class UpdateClient {
  private clientRepository: IClientRepository;
  private clientInfo: IClientWithNullableProps;
  private verifier = new Verifier();

  constructor(
    clientRepository: IClientRepository,
    clientInfo: IClientWithNullableProps
  ) {
    this.clientRepository = clientRepository;
    this.clientInfo = clientInfo;
  }

  execute() {
    const {
      razon_social,
      nombre_comercial,
      direccion_entrega,
      telefono,
      correo_electronico,
    } = this.clientInfo;

    if (
      correo_electronico &&
      this.verifier.isEmail(correo_electronico) === false
    ) {
      throw new Error("El correo electrónico no es válido");
    }

    if (telefono && this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }

    if (
      (razon_social && this.verifier.isEmpty({ value: razon_social })) ||
      (nombre_comercial &&
        this.verifier.isEmpty({ value: nombre_comercial })) ||
      (direccion_entrega && this.verifier.isEmpty({ value: direccion_entrega }))
    ) {
      throw new Error("Todas las casillas son requeridas");
    }
    if (
      direccion_entrega &&
      this.verifier.isEmpty({ value: direccion_entrega, min: 5 })
    ) {
      throw new Error("La dirección de entrega debe ser más detallada.");
    }
    if (
      direccion_entrega &&
      this.verifier.isEmpty({ value: direccion_entrega, max: 5 })
    ) {
      throw new Error(
        "La dirección de entrega no debe superar los 150 caracteres."
      );
    }

    if (
      (razon_social &&
        this.verifier.isEmpty({ value: razon_social, min: 3 })) ||
      (nombre_comercial &&
        this.verifier.isEmpty({ value: nombre_comercial, min: 3 }))
    ) {
      throw new Error(
        "El nombre comercial y la razón social no pueden ser demasiado cortos."
      );
    }
    const updateClient = this.clientRepository.updateClient(this.clientInfo);
    return updateClient;
  }
}
