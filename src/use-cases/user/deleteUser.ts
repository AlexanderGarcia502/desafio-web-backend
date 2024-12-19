import { User } from "../../entities/user";
import { IUserRepository } from "../repositories/user-repository-interface";

export type IUserPropertiesForDelete = Required<Pick<User, "idUsuarios">> & {
  idUserToDelete: number;
};

export class DeleteUser {
  private userRepository: IUserRepository;
  private userInfo: IUserPropertiesForDelete;
  constructor(
    userRepository: IUserRepository,
    userInfo: IUserPropertiesForDelete
  ) {
    this.userRepository = userRepository;
    this.userInfo = userInfo;
  }
  execute = () => {
    const updateUser = this.userRepository.deleteUser(this.userInfo);
    return updateUser;
  };
}
