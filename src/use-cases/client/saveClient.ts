import Client from "../../entities/client";
import { IClientRepository } from "../repositories/client-repository-interface";

export default class SaveClient {
  private clientRepository: IClientRepository;
  private clientInfo: Client;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo_electronico)) {
      throw new Error("El correo electrónico no es válido");
    }
    const phoneRegex = /^\d{8}$/;

    if (!phoneRegex.test(telefono)) {
      throw new Error("El número de teléfono debe tener exactamente 8 dígitos");
    }
    if (
      !razon_social.trim() ||
      !nombre_comercial.trim() ||
      !direccion_entrega.trim()
    ) {
      throw new Error("Todas las casillas son requeridas");
    }
    if (direccion_entrega.trim().length <= 5) {
      throw new Error("La dirección de entrega debe ser más detallada.");
    }

    if (razon_social.trim().length < 3 || nombre_comercial.trim().length < 3) {
      throw new Error(
        "El nombre comercial y la razón social no pueden ser demasiado cortos."
      );
    }

    return this.clientRepository.saveClient(this.clientInfo);
  }
}
