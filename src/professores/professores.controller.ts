import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { Usuario as UsuarioModel } from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post()
  async signupUser(
    @Body() professorData: CreateUsuarioDto,
  ): Promise<UsuarioModel> {
    return this.professoresService.createProfessor(professorData);
  }


}
