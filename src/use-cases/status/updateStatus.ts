import { Verifier } from "../../../utils/verifier";
import { Status } from "../../entities/status";
import { IStatusRepository } from "../repositories/status-repository-interface";

export type IStatePropertiesRequiredProps = Required<
  Omit<Status, "idUsuarios">
>;

export class UpdateStatus {
  private statusRepository: IStatusRepository;
  private statusInfo: IStatePropertiesRequiredProps;
  private verifier = new Verifier();

  constructor(
    statusRepository: IStatusRepository,
    statusInfo: IStatePropertiesRequiredProps
  ) {
    this.statusRepository = statusRepository;
    this.statusInfo = statusInfo;
  }

  execute() {
    const { nombre } = this.statusInfo;
    if (nombre && this.verifier.isEmpty({ value: nombre, min: 3 })) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }

    const updateStatus = this.statusRepository.updateStatus(this.statusInfo);
    return updateStatus;
  }
}
