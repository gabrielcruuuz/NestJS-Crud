import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFile } from 'fs';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return await writeFile(path, file.buffer, (error) => {
      if (error) {
        throw new BadRequestException(error);
      }
    });
  }
}
