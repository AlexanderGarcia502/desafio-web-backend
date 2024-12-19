import { Rol } from "../../entities/rol";
import { IRolRepository } from "../../use-cases/repositories/rol-repository-interface";
import {
  DeleteRol,
  IRolPropertiesForDelete,
} from "../../use-cases/rol/deleteRol";
import { SaveRol } from "../../use-cases/rol/saveRol";
import {
  IRolPropertiesRequiredProps,
  UpdateRol,
} from "../../use-cases/rol/updateRol";

export class RolService {
  private rolRepository: IRolRepository;

  constructor(rolRepository: IRolRepository) {
    this.rolRepository = rolRepository;
  }

  save(rolInfo: Rol) {
    const saveRol = new SaveRol(this.rolRepository, rolInfo);
    return saveRol.execute();
  }
  update(rolInfo: IRolPropertiesRequiredProps) {
    const updateRol = new UpdateRol(this.rolRepository, rolInfo);
    return updateRol.execute();
  }
  delete(rolInfo: IRolPropertiesForDelete) {
    const deleteRol = new DeleteRol(this.rolRepository, rolInfo);
    return deleteRol.execute();
  }
}