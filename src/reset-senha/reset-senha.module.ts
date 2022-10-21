import { Module } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { ResetSenhaController } from './reset-senha.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports:[UsuariosModule, UsuariosService, MailerModule.forRoot({
    transport:{
      host: process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }

    },
    defaults:{
      from: process.env.SMTP_NOREPLY,
    }
  })],
  controllers: [ResetSenhaController],
  providers: [ResetSenhaService],
})
export class ResetSenhaModule {}
