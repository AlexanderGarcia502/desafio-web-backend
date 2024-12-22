import { Verifier } from "../../../utils/verifier";
import { Status } from "../../entities/status";
import { IStatusRepository } from "../repositories/status-repository-interface";

export class SaveStatus {
  private statusRepository: IStatusRepository;
  private statusInfo: Status;
  private verifier = new Verifier();

  constructor(statusRepository: IStatusRepository, statusInfo: Status) {
    this.statusRepository = statusRepository;
    this.statusInfo = statusInfo;
  }

  execute() {
    const { nombre } = this.statusInfo;
    if (nombre && this.verifier.isEmpty({ value: nombre, min: 3 })) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }

    const saveStatus = this.statusRepository.saveStatus(this.statusInfo);
    return saveStatus;
  }
}
