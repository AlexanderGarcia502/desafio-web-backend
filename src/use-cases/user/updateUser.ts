import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export type IUserWithNullableProps = {
  [K in keyof User]: K extends "idUsuarios" ? User[K] : User[K] | null;
};

export class UpdateUser {
  private userRepository: IUserRepository;
  private userInfo: IUserWithNullableProps;
  constructor(
    userRepository: IUserRepository,
    userInfo: IUserWithNullableProps
  ) {
    this.userRepository = userRepository;
    this.userInfo = userInfo;
  }
  execute = () => {
    // VALIDACIONES CON LIBRERIA VALIDATOR

    const updateUser = this.userRepository.updateUser(this.userInfo);
    return updateUser;
  };
}
