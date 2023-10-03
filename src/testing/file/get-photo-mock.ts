import { join } from 'path';
import { getFileBuffer } from './get-file-to-buffer';

export const getPhoto = async () => {
  const { buffer, stream } = await getFileBuffer(join(__dirname, 'photo.png'));

  const photo: Express.Multer.File = {
    fieldname: 'file_test',
    originalname: 'photo.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1024 * 50,
    stream,
    destination: '',
    filename: '',
    path: '',
    buffer,
  };

  return photo;
};
