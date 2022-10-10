import path from 'path'; // for getting file extension
import multer, { MulterError } from 'multer'; // for uploading files
import { UnsupportedMediaTypeException } from '@nestjs/common';

const max_size = 1024 * 1024;

export function checkFileType(req, file, cb) {
  if (
    file.fieldname === 'historico_graduacao_file' ||
    file.fieldname === 'historico_posgraduacao_file'
  ) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException('Only PDF files allowed'), false); // else fails
    }
  }
}
