import { Status } from "../../entities/status";
import { IStatusRepository } from "../repositories/status-repository-interface";

export class SaveStatus {
  private statusRepository: IStatusRepository;
  private statusInfo: Status;

  constructor(statusRepository: IStatusRepository, statusInfo: Status) {
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

    const saveStatus = this.statusRepository.saveStatus(this.statusInfo);
    return saveStatus;
  }
}
