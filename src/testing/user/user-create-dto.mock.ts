import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { userEntityList } from './user-entity-list-mock';

export const createUserDTO: CreateUserDTO = {
  birthAt: String(userEntityList[0].birthAt),
  email: userEntityList[0].email,
  name: userEntityList[0].name,
  password: userEntityList[0].password,
  role: userEntityList[0].role,
};
