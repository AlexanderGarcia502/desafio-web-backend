import { Status } from "../../entities/status";
import { IStatusRepository } from "../repositories/status-repository-interface";

export type IStatePropertiesRequiredProps = Required<Status>;

export class UpdateStatus {
  private statusRepository: IStatusRepository;
  private statusInfo: IStatePropertiesRequiredProps;

  constructor(
    statusRepository: IStatusRepository,
    statusInfo: IStatePropertiesRequiredProps
  ) {
    this.statusRepository = statusRepository;
    this.statusInfo = statusInfo;
  }

  execute() {
    const { nombre } = this.statusInfo;
    if (!nombre.trim()) {
      throw new Error("Casilla nombre requerida.");
    }
    if (nombre.trim().length < 3) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }

    const updateStatus = this.statusRepository.updateStatus(this.statusInfo);
    return updateStatus;
  }
}
