import { Verifier } from "../../../utils/verifier";
import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export interface ICredentials {
  correo_electronico: string;
  password: string;
}

export class Login {
  private userRepository: IUserRepository;
  private credentials: ICredentials;
  private verifier = new Verifier();

  constructor(userRepository: IUserRepository, credentials: ICredentials) {
    this.userRepository = userRepository;
    this.credentials = credentials;
  }

  async execute(): Promise<Omit<User, "password">> {
    const { correo_electronico, password } = this.credentials;
    if (
      this.verifier.isEmpty({ value: correo_electronico }) ||
      this.verifier.isEmpty({ value: password })
    ) {
      throw new Error("Todos los campos son requeridos");
    }

    const login = this.userRepository.login({ correo_electronico, password });
    return login;
  }
}
