import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService], 
  imports: [UsuariosModule, UsuariosService],
  exports: [ProfessoresService]
})
export class ProfessoresModule {}
