import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { AlunosModule } from 'src/alunos/alunos.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
  imports: [AlunosModule]
})
export class UsuariosModule {}
