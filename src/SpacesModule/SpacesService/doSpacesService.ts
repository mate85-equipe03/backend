// doSpacesService.ts
import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadedMulterFileI } from '.';
import {
  DoSpacesServiceLib,
  DoSpacesServicerovider,
} from './index';

// Typical nestJs service
@Injectable()
export class DoSpacesService {
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  async uploadFile(file: UploadedMulterFileI) {
    // Precaution to avoid having 2 files with the same name
    const fileName = `${Date.now()}-${
      file.originalname
    }`;

    // Return a promise that resolves only when the file upload is complete
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: fileName,
          Body: file.buffer,
          ACL: process.env.S3_ACL,
        },
        (error: AWS.AWSError) => {
          if (!error) {            
            resolve(`${process.env.S3_URL}/${fileName}`);
          } else {
            reject(
              new Error(
                `DoSpacesService_ERROR: ${error.message || 'Something went wrong'}`,
              ),
            );
          }
        },
      );
    });
  }
}
