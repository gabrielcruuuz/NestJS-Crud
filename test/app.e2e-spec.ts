import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { createUserDTO } from '../src/testing/user/user-create-dto.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close;
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // it('Register new user', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/auth/register')
  //     .send(createUserDTO);

  //   expect(response.statusCode).toEqual(201);
  //   expect(typeof response.body.accessToken).toEqual('string');
  // });

  // it('Login the new user', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({
  //       email: createUserDTO.email,
  //       password: createUserDTO.password,
  //     });

  //   expect(response.statusCode).toEqual(201);
  //   expect(typeof response.body.accessToken).toEqual('string');

  //   accessToken = response.body.accessToken;
  // });
});
