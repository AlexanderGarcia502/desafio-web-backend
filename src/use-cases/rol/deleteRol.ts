import { Rol } from "../../entities/rol";
import { IRolRepository } from "../repositories/rol-repository-interface";

export type IRolPropertiesForDelete = Required<
  Pick<Rol, "idUsuarios" | "idRol">
>;

export class DeleteRol {
  private rolRepository: IRolRepository;
  private rolInfo: IRolPropertiesForDelete;

  constructor(rolRepository: IRolRepository, rolInfo: IRolPropertiesForDelete) {
    this.rolRepository = rolRepository;
    this.rolInfo = rolInfo;
  }

  execute() {
    const updateRol = this.rolRepository.deleteRol(this.rolInfo);
    return updateRol;
  }
}
