import { Rol } from "../../entities/rol";
import { IRolPropertiesForDelete } from "../rol/deleteRol";
import { IRolPropertiesRequiredProps } from "../rol/updateRol";

export interface IRolRepository {
  saveRol: (rolInfo: Rol) => void;
  updateRol: (rolInfo: IRolPropertiesRequiredProps) => void;
  deleteRol: (rolInfo: IRolPropertiesForDelete) => void;
}
