import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const userExist = await this.existByEmail(data.email);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    if (!userExist) {
      return await this.prisma.user.create({
        data,
      });
    } else {
      throw new BadRequestException(
        `user with email ${data.email} already register`,
      );
    }
  }

  async update(data: UpdateUserDTO, id: number) {
    await this.exist(id);

    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async list() {
    return await this.prisma.user.findMany();
  }

  async get(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async delete(id: number) {
    await this.exist(id);

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exist(id: number) {
    if (
      !(await this.prisma.user.count({
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
      !(await this.prisma.user.count({
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
