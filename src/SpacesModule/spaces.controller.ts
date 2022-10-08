import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DoSpacesService } from './SpacesService/doSpacesService';

// just a typical nestJs controller
@Controller('/api/v1/do')
export class SpacesController {
  constructor(private readonly doSpacesService: DoSpacesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('spaces')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.doSpacesService.uploadFile(file);

    return {
      url,
    };
  }
}
