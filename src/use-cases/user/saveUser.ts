import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export class SaveUser {
  private userRepository: IUserRepository;
  private userInfo: User;
  constructor(userRepository: IUserRepository, userInfo: User) {
    this.userRepository = userRepository;
    this.userInfo = userInfo;
  }
  execute = () => {
    // VALIDACIONES CON LIBRERIA VALIDATOR

    const saveUser = this.userRepository.saveUser(this.userInfo);
    return saveUser;
  };
}
