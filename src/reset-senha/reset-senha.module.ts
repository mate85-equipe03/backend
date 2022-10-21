import { Module } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { ResetSenhaController } from './reset-senha.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports:[
    UsuariosModule, 
    UsuariosService, 
  ],
  controllers: [ResetSenhaController],
  providers: [ResetSenhaService],
})
export class ResetSenhaModule {}
