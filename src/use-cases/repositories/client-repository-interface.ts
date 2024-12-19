import Client from "../../entities/client";
import { IClientPropertiesForDelete } from "../client/deleteClient";
import { IClientWithNullableProps } from "../client/updateClient";

export interface IClientRepository {
  saveClient: (client: Client) => void;
  updateClient: (client: IClientWithNullableProps) => void;
  deleteClient: (client: IClientPropertiesForDelete) => void;
  getClientByID?: () => Promise<Client>;
}
