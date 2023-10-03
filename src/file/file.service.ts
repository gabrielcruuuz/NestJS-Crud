import { BadRequestException, Injectable } from '@nestjs/common';
import { PathLike, writeFile } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  getDestinationPath() {
    return join(__dirname, '..', '..', 'storage');
  }

  async upload(file: Express.Multer.File, filename: string) {
    const path: PathLike = join(this.getDestinationPath(), filename);

    await writeFile(path, file.buffer, (error) => {
      if (error) {
        throw new BadRequestException(error);
      }
    });

    return path;
  }
}
