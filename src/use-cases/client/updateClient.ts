import Client from "../../entities/client";
import { IClientRepository } from "../repositories/client-repository-interface";

export type IClientWithNullableProps = {
  [K in keyof Client]: K extends "idClientes" ? Client[K] : Client[K] | null;
};

export class UpdateClient {
  private clientRepository: IClientRepository;
  private clientInfo: IClientWithNullableProps;

  constructor(
    clientRepository: IClientRepository,
    clientInfo: IClientWithNullableProps
  ) {
    this.clientRepository = clientRepository;
    this.clientInfo = clientInfo;
  }

  execute() {
    const updateClient = this.clientRepository.updateClient(this.clientInfo);
    return updateClient;
  }
}
