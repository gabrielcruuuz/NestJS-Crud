import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtServiceMock } from '../testing/auth/jwt-service.mock ';
import { userServiceMock } from '../testing/user/user-service.mock ';
import { mailerServiceMock } from '../testing/auth/mailer-service.mock';
import { userEntityList } from '../testing/user/user-entity-list-mock';
import { accessToken } from '../testing/auth/access-token.mock';
import { jwtPayload } from '../testing/auth/jwt-payload.mock';
import { resetToken } from '../testing/auth/reset-token.mock';
import { RegisterDTO } from './dto/register.dto';

describe('AuthSerice', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userServiceMock,
        jwtServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validade definition', () => {
    expect(authService).toBeDefined();
  });

  describe('token', () => {
    test('create token', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    test('check token for login', () => {
      const result = authService.checkToken(accessToken, 'login');

      expect(result).toEqual(jwtPayload);
    });

    test('is valid token for login', () => {
      const result = authService.isValidToken(accessToken, 'login');

      expect(result).toEqual(true);
    });
  });

  describe('auth', () => {
    test('login', async () => {
      const result = await authService.login('teste@teste.com', '123456');

      expect(result).toEqual({ accessToken });
    });

    test('forget', async () => {
      const result = await authService.forget('teste@teste.com');

      expect(result).toEqual(true);
    });

    test('reset', async () => {
      const result = await authService.reset('654321', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('register', async () => {
      const newRegister: RegisterDTO = {
        name: 'test',
        email: 'test@test.com',
        password: '123456',
      };

      const result = await authService.register(newRegister);

      expect(result).toEqual({ accessToken });
    });
  });
});
