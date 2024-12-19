import { User } from "../../entities/user";
import { IUserPropertiesForDelete } from "../user/deleteUser";
import { IUserWithNullableProps } from "../user/updateUser";

export interface IUserRepository {
  saveUser: (userInfo: User) => void;
  updateUser: (userInfo: IUserWithNullableProps) => void;
  deleteUser: (userInfo: IUserPropertiesForDelete) => void;
}
