import { UserService } from '../../user/user.service';
import { userEntityList } from './user-entity-list-mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    getByEmail: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePassword: jest.fn(),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    list: jest.fn().mockResolvedValue(userEntityList),
    get: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
    exist: jest.fn(),
    existByEmail: jest.fn(),
  },
};
