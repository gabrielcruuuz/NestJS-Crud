import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/file/get-photo-mock';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validade definition', () => {
    expect(fileService).toBeDefined();
  });

  describe('FileService test', () => {
    test('upload', async () => {
      const fakePhoto = await getPhoto();
      fileService.upload(fakePhoto, 'photo-test.png');
    });
  });
});
