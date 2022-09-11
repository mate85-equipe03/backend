import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario as UsuarioModel} from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post('professor')
  async signupUser(
    @Body() professorData: { login: string; email: string, senha: string, siape: string},
  ): Promise<UsuarioModel> {
    return this.professoresService.createProfessor(professorData);
  }
}
  

