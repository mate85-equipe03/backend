import path from 'path'; // for getting file extension
import multer from 'multer'; // for uploading files
import { UnsupportedMediaTypeException } from '@nestjs/common';

export function checkFileType(req, file, cb) {
  //   console.log('ENTROU NO FILTER');
  //   console.log(file.fieldname);
  //   console.log(file.fileName);
  if (
    file.fieldname === 'historico_graduacao_file' ||
    file.fieldname === 'historico_posgraduacao_file'
  ) {
    // console.log('entrou no primeiro if');
    if (file.mimetype === 'application/pdf') {
      //   console.log(file.fieldname + 'tá ok\n');
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException('Only PDF files allowed'), false); // else fails
    }
  }
  //   console.log('SAIU NO FILTER');
}
