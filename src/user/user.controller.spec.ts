import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user/user-service.mock ';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDTO } from '../testing/user/user-create-dto.mock';
import { userEntityList } from '../testing/user/user-entity-list-mock';
import { updateUserDTO } from '../testing/user/user-update-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .overrideGuard(RoleGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validate definition', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('validate guards', () => {
    test('both guards are avaliable', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Should create a user', async () => {
      const result = await userController.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Should update a user', async () => {
      const result = await userController.update(updateUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Should get all users', async () => {
      const result = await userController.read();

      expect(result).toEqual(userEntityList);
    });

    test('Should get one user', async () => {
      const result = await userController.readOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Should delete one user', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual(true);
    });
  });
});
