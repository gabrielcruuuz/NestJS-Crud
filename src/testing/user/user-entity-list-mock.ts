import { Role } from '../../enums/role.enum';
import { UserEntity } from '../../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'test',
    birthAt: new Date('2000-01-01'),
    email: 'teste@teste.com',
    password: '$2b$10$Yv5rCu.8clti2.dXQf2Ke.f2EVH8mF0eYF/TPjeU/seoCpEkWm852',
    role: Role.Admin,
  },
  {
    id: 2,
    name: 'test2',
    birthAt: new Date('2000-01-01'),
    email: 'test2@teste.com',
    password: '$2b$10$Yv5rCu.8clti2.dXQf2Ke.f2EVH8mF0eYF/TPjeU/seoCpEkWm852',
    role: Role.Admin,
  },
  {
    id: 3,
    name: 'test3',
    birthAt: new Date('2000-01-01'),
    email: 'test3@teste.com',
    password: '$2b$10$Yv5rCu.8clti2.dXQf2Ke.f2EVH8mF0eYF/TPjeU/seoCpEkWm852',
    role: Role.Admin,
  },
];
