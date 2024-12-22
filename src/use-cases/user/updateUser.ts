import { Verifier } from "../../../utils/verifier";
import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export type IUserWithNullableProps = {
  [K in keyof User]: K extends "idUsuarios" ? User[K] : User[K] | null;
};

export class UpdateUser {
  private userRepository: IUserRepository;
  private userInfo: IUserWithNullableProps;
  private verifier = new Verifier();

  constructor(
    userRepository: IUserRepository,
    userInfo: IUserWithNullableProps
  ) {
    this.userRepository = userRepository;
    this.userInfo = userInfo;
  }
  execute = () => {
    const {
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = this.userInfo;

    if (
      (correo_electronico &&
        this.verifier.isEmpty({ value: correo_electronico })) ||
      (nombre_completo && this.verifier.isEmpty({ value: nombre_completo })) ||
      (password && this.verifier.isEmpty({ value: password })) ||
      (telefono && this.verifier.isEmpty({ value: telefono }))
    ) {
      throw new Error("Todos los campos son requeridos");
    }

    if (
      correo_electronico &&
      this.verifier.isEmail(correo_electronico) === false
    ) {
      throw new Error("El correo electrónico no es válido");
    }

    if (telefono && this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }
    if (password && this.verifier.isEmpty({ value: password, min: 6 })) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    if (
      nombre_completo &&
      this.verifier.isEmpty({ value: nombre_completo, min: 8 })
    ) {
      throw new Error("Debes ingresar tu nombre completo.");
    }
    if (fecha_nacimiento && this.verifier.isAdult(fecha_nacimiento) !== true) {
      throw new Error("Debes ser mayor de edad");
    }

    const updateUser = this.userRepository.updateUser(this.userInfo);
    return updateUser;
  };
}
