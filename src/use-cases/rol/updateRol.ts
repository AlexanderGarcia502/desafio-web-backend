import { Rol } from "../../entities/rol";
import { IRolRepository } from "../repositories/rol-repository-interface";

export type IRolPropertiesRequiredProps = Required<Rol>;

export class UpdateRol {
  private rolRepository: IRolRepository;
  private rolInfo: IRolPropertiesRequiredProps;

  constructor(
    rolRepository: IRolRepository,
    rolInfo: IRolPropertiesRequiredProps
  ) {
    this.rolRepository = rolRepository;
    this.rolInfo = rolInfo;
  }

  execute() {
    const { nombre } = this.rolInfo;
    if (!nombre.trim()) {
      throw new Error("Casilla nombre requerida.");
    }
    if (nombre.trim().length < 3) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }

    const updateRol = this.rolRepository.updateRol(this.rolInfo);
    return updateRol;
  }
}
