import Client from "../../entities/client";
import { IClientRepository } from "../repositories/client-repository-interface";

export type IClientPropertiesForDelete = Required<Pick<Client, "idClientes">>;

export class DeleteClient {
  private clientRepository: IClientRepository;
  private clientInfo: IClientPropertiesForDelete;

  constructor(
    clientRepository: IClientRepository,
    clientInfo: IClientPropertiesForDelete
  ) {
    this.clientRepository = clientRepository;
    this.clientInfo = clientInfo;
  }

  execute() {
    const deleteClient = this.clientRepository.deleteClient(this.clientInfo);
    return deleteClient;
  }
}
