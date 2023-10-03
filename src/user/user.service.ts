import { CreateUserDTO } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async create(data: CreateUserDTO) {
    const userExist = await this.existByEmail(data.email);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    if (!userExist) {
      const newUser = await this.usersRepository.create(data);
      return await this.usersRepository.save(newUser);
    } else {
      throw new BadRequestException(
        `user with email ${data.email} already register`
      );
    }
  }

  async update(data: UpdateUserDTO, id: number) {
    await this.exist(id);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    await this.usersRepository.update(id, {
      name: data.name,
      email: data.email,
      role: data.role,
      birthAt: data.birthAt ? new Date(data.birthAt) : null,
    });

    return this.get(id);
  }

  async updatePassword(newPassword: string, id: number) {
    await this.exist(id);

    newPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());

    return await this.usersRepository.update(id, {
      password: newPassword,
    });
  }

  async list() {
    return await this.usersRepository.find();
  }

  async get(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOneBy({
      email,
    });
  }

  async delete(id: number) {
    await this.exist(id);

    await this.usersRepository.delete(id);

    return true;
  }

  async exist(id: number) {
    if (
      !(await this.usersRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
  }

  async existByEmail(email: string) {
    if (
      !(await this.usersRepository.exist({
        where: {
          email,
        },
      }))
    ) {
      return false;
    }

    return true;
  }
}
