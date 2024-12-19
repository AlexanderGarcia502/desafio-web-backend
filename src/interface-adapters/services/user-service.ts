import { User } from "../../entities/user";
import { IUserRepository } from "../../use-cases/repositories/user-repository-interface";
import {
  DeleteUser,
  IUserPropertiesForDelete,
} from "../../use-cases/user/deleteUser";
import { SaveUser } from "../../use-cases/user/saveUser";
import {
  IUserWithNullableProps,
  UpdateUser,
} from "../../use-cases/user/updateUser";

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  save = (userInfo: User) => {
    const saveUser = new SaveUser(this.userRepository, userInfo);
    return saveUser.execute();
  };
  update = (userInfo: IUserWithNullableProps) => {
    const updateUser = new UpdateUser(this.userRepository, userInfo);
    return updateUser.execute();
  };
  delete = (userInfo: IUserPropertiesForDelete) => {
    const deleteUser = new DeleteUser(this.userRepository, userInfo);
    return deleteUser.execute();
  };
}
