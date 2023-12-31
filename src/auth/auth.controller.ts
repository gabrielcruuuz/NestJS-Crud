import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ForgetDTO } from './dto/forget.dto';
import { ResetDTO } from './dto/reset.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDTO) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: ForgetDTO) {
    return await this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { newPassword, token }: ResetDTO) {
    return await this.authService.reset(newPassword, token);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 100 }),
        ],
      })
    )
    photo: Express.Multer.File
  ) {
    const filename = `photo-${user.id}.png`;

    await this.fileService.upload(photo, filename);

    return { success: true };
  }
}
