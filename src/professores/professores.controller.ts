import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { Professor as ProfessorModel} from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post('professor')
  async signupUser(
    @Body() professorData: { login: string; email: string, senha: string, siape: string},
  ): Promise<ProfessorModel> {
    return this.professoresService.createProfessor(professorData);
  }
}
  

