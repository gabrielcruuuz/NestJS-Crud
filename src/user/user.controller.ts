import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user-dto';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorates';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptors';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get()
  async read() {
    return await this.userService.list();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.get(id);
  }

  @Put(':id')
  async update(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id) {
    return await this.userService.update(data, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
