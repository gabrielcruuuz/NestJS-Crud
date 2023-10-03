import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { usersRepositoryMock } from '../testing/user/user-repository.mock';
import { userEntityList } from '../testing/user/user-entity-list-mock';
import { createUserDTO } from '../testing/user/user-create-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updateUserDTO } from '../testing/user/user-update-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, usersRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validade definition', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('Should create a user', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Should update one user', async () => {
      const result = await userService.update(updateUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Should get all users', async () => {
      const result = await userService.list();

      expect(result).toEqual(userEntityList);
    });

    test('Should get one user', async () => {
      const result = await userService.get(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Should delete one user', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});
