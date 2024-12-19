import Client from "../../entities/client";
import {
  DeleteClient,
  IClientPropertiesForDelete,
} from "../../use-cases/client/deleteClient";
import SaveClient from "../../use-cases/client/saveClient";
import {
  IClientWithNullableProps,
  UpdateClient,
} from "../../use-cases/client/updateClient";
import { IClientRepository } from "../../use-cases/repositories/client-repository-interface";

export class ClientService {
  private clientRepository: IClientRepository;
  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }
  save(clientInfo: Client) {
    const saveClient = new SaveClient(this.clientRepository, clientInfo);
    return saveClient.execute();
  }
  update(clientInfo: IClientWithNullableProps) {
    const updateClient = new UpdateClient(this.clientRepository, clientInfo);
    return updateClient.execute();
  }
  delete(clientInfo: IClientPropertiesForDelete) {
    const deleteClient = new DeleteClient(this.clientRepository, clientInfo);
    return deleteClient.execute();
  }
}
