import { Status } from "../../entities/status";
import { IStatusRepository } from "../../use-cases/repositories/status-repository-interface";
import { SaveStatus } from "../../use-cases/status/saveStatus";
import {
  IStatePropertiesRequiredProps,
  UpdateStatus,
} from "../../use-cases/status/updateStatus";

export class StatusService {
  private statusRepository: IStatusRepository;

  constructor(statusRepository: IStatusRepository) {
    this.statusRepository = statusRepository;
  }

  save(statusInfo: Status) {
    const saveStatus = new SaveStatus(this.statusRepository, statusInfo);
    return saveStatus.execute();
  }
  update(statusInfo: IStatePropertiesRequiredProps) {
    const updateStatus = new UpdateStatus(this.statusRepository, statusInfo);
    return updateStatus.execute();
  }
}
