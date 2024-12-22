import { Verifier } from "../../../utils/verifier";
import Client from "../../entities/client";
import { IClientRepository } from "../repositories/client-repository-interface";

export default class SaveClient {
  private clientRepository: IClientRepository;
  private clientInfo: Client;
  private verifier = new Verifier();

  constructor(clientRepository: IClientRepository, clientInfo: Client) {
    this.clientRepository = clientRepository;
    this.clientInfo = clientInfo;
  }
  async execute() {
    const {
      correo_electronico,
      telefono,
      razon_social,
      nombre_comercial,
      direccion_entrega,
    } = this.clientInfo;

    if (this.verifier.isEmail(correo_electronico) === false) {
      throw new Error("El correo electrónico no es válido");
    }

    if (this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }

    if (
      this.verifier.isEmpty({ value: razon_social }) ||
      this.verifier.isEmpty({ value: nombre_comercial }) ||
      this.verifier.isEmpty({ value: direccion_entrega })
    ) {
      throw new Error("Todas las casillas son requeridas");
    }
    if (this.verifier.isEmpty({ value: direccion_entrega, min: 5 })) {
      throw new Error("La dirección de entrega debe ser más detallada.");
    }
    if (this.verifier.isEmpty({ value: direccion_entrega, max: 5 })) {
      throw new Error(
        "La dirección de entrega no debe superar los 150 caracteres."
      );
    }

    if (
      this.verifier.isEmpty({ value: razon_social, min: 3 }) ||
      this.verifier.isEmpty({ value: nombre_comercial, min: 3 })
    ) {
      throw new Error(
        "El nombre comercial y la razón social no pueden ser demasiado cortos."
      );
    }

    return this.clientRepository.saveClient(this.clientInfo);
  }
}
