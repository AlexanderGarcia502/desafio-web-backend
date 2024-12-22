import { Verifier } from "../../../utils/verifier";
import { Rol } from "../../entities/rol";
import { IRolRepository } from "../repositories/rol-repository-interface";

export class SaveRol {
  private rolRepository: IRolRepository;
  private rolInfo: Rol;
  private verifier = new Verifier();

  constructor(rolRepository: IRolRepository, rolInfo: Rol) {
    this.rolRepository = rolRepository;
    this.rolInfo = rolInfo;
  }

  execute() {
    const { nombre } = this.rolInfo;
    if (this.verifier.isEmpty({ value: nombre, min: 3 })) {
      throw new Error("El nombre no puede ser demasiado corto.");
    }

    const saveRol = this.rolRepository.saveRol(this.rolInfo);
    return saveRol;
  }
}
