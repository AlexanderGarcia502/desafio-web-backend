import { Status } from "../../entities/status";
import { IStatePropertiesRequiredProps } from "../status/updateStatus";

export interface IStatusRepository {
  saveStatus: (statusInfo: Status) => void;
  updateStatus: (statusInfo: IStatePropertiesRequiredProps) => void;
}
