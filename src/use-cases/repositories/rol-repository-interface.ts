import { Rol } from "../../entities/rol";
import { IRolPropertiesRequiredProps } from "../rol/updateRol";

export interface IRolRepository {
  saveRol: (rolInfo: Rol) => void;
  updateRol: (rolInfo: IRolPropertiesRequiredProps) => void;
}
