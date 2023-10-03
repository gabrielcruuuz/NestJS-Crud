import { UpdateUserDTO } from '../../user/dto/update-user-dto';
import { userEntityList } from './user-entity-list-mock';

export const updateUserDTO: UpdateUserDTO = {
  birthAt: String(userEntityList[0].birthAt),
  email: userEntityList[0].email,
  name: userEntityList[0].name,
  password: userEntityList[0].password,
  role: userEntityList[0].role,
};
