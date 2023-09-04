import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string, issuer: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: issuer,
        audience: this.audience,
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string, issuer: string) {
    try {
      this.checkToken(token, issuer);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email or password incorrect.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Email or password incorrect.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    // send mail

    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('email not found.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: this.audience,
      },
    );

    await this.mailer.sendMail({
      subject: 'password recover',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return true;
  }

  async reset(newPassword: string, token: string) {
    // token valido, alterar senha na base

    try {
      const { id } = this.checkToken(token, 'forget');

      const salt = await bcrypt.genSalt();
      newPassword = await bcrypt.hash(newPassword, salt);

      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: newPassword,
        },
      });

      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(newRegister: RegisterDTO) {
    const user = await this.userService.create(newRegister);

    return this.createToken(user);
  }
}
