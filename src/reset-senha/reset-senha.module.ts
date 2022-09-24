import { Module } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { ResetSenhaController } from './reset-senha.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MailerModule.forRoot({
    transport:{
      host:'localhost',
      port:1025

    },
    defaults:{
      from:'no-reply@postgress.com'
    }
  })],
  controllers: [ResetSenhaController],
  providers: [ResetSenhaService],
})
export class ResetSenhaModule {}
