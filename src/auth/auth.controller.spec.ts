import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { FileServiceMock } from '../testing/file/file-service.mock ';
import { authServiceMock } from '../testing/auth/auth-service.mock ';
import { authLoginDTO } from '../testing/auth/login-dto.mock';
import { accessToken } from '../testing/auth/access-token.mock';
import { ForgetDTO } from './dto/forget.dto';
import { createUserDTO } from '../testing/user/user-create-dto.mock';
import { ResetDTO } from './dto/reset.dto';
import { resetToken } from '../testing/auth/reset-token.mock';
import { getPhoto } from '../testing/file/get-photo-mock';
import { userEntityList } from '../testing/user/user-entity-list-mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, FileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validate definition', () => {
    expect(authController).toBeDefined();
  });

  describe('Autentication Flow', () => {
    test('Login', async () => {
      const result = await authController.login(authLoginDTO);

      expect(result).toEqual({ accessToken });
    });

    test('Register', async () => {
      const result = await authController.register(createUserDTO);

      expect(result).toEqual({ accessToken });
    });

    test('Forget', async () => {
      const forgetDTO: ForgetDTO = {
        email: 'test@test.com',
      };
      const result = await authController.forget(forgetDTO);

      expect(result).toEqual(true);
    });

    test('Reset', async () => {
      const resetDTO: ResetDTO = {
        token: resetToken,
        newPassword: '654321',
      };
      const result = await authController.reset(resetDTO);

      expect(result).toEqual({ accessToken });
    });
  });

  describe('already authenticated routes', () => {
    test('Upload photo', async () => {
      const fakePhoto = await getPhoto();

      const result = await authController.uploadPhoto(
        userEntityList[0],
        fakePhoto
      );

      expect(result).toEqual({ success: true });
    });
  });
});
