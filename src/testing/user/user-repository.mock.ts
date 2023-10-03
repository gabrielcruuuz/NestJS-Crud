import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { userEntityList } from './user-entity-list-mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    exist: jest.fn().mockResolvedValue(true),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    save: jest.fn().mockResolvedValue(userEntityList[0]),
    find: jest.fn().mockResolvedValue(userEntityList),
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue(true),
  },
};
