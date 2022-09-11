import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [ProfessoresController],
  providers: [ProfessoresService], 
  imports: [UsuariosModule],
  exports: [ProfessoresService]
})
export class ProfessoresModule {}
