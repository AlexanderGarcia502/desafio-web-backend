import { Verifier } from "../../../utils/verifier";
import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export class SaveUser {
  private userRepository: IUserRepository;
  private userInfo: User;
  private verifier = new Verifier();

  constructor(userRepository: IUserRepository, userInfo: User) {
    this.userRepository = userRepository;
    this.userInfo = userInfo;
  }
  execute = () => {
    const {
      rol_idRol,
      correo_electronico,
      nombre_completo,
      password,
      telefono,
      fecha_nacimiento,
    } = this.userInfo;

    if (
      this.verifier.isEmpty({ value: correo_electronico }) ||
      this.verifier.isEmpty({ value: nombre_completo }) ||
      this.verifier.isEmpty({ value: password }) ||
      this.verifier.isEmpty({ value: telefono })
    ) {
      throw new Error("Todos los campos son requeridos");
    }

    if (this.verifier.isEmail(correo_electronico) === false) {
      throw new Error("El correo electrónico no es válido");
    }

    if (this.verifier.isPhoneNumberString(telefono) === false) {
      throw new Error("Número de teléfono no valido");
    }
    if (this.verifier.isEmpty({ value: password, min: 6 })) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    if (this.verifier.isEmpty({ value: nombre_completo, min: 8 })) {
      throw new Error("Debes ingresar tu nombre completo.");
    }
    if (this.verifier.isAdult(fecha_nacimiento) !== true) {
      throw new Error("Debes ser mayor de edad");
    }

    const saveUser = this.userRepository.saveUser({
      rol_idRol,
      correo_electronico: correo_electronico.trim(),
      nombre_completo: nombre_completo.trim(),
      password: password.trim(),
      telefono: telefono.trim(),
      fecha_nacimiento,
    });
    return saveUser;
  };
}
