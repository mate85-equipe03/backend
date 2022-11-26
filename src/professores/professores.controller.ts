import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards
} from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt-auth.guard';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/autenticacao/guards/roles.guard';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { UpdateProfessoreDto } from './dto/update-professore.dto';
import { Usuario as UsuarioModel } from '@prisma/client';

@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Roles(Role.ROOT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() professorData: CreateUsuarioDto,
  ): Promise<UsuarioModel> {
    return this.professoresService.createProfessor(professorData);
  }

  @Roles(Role.ROOT, Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('editar-inscricao/:id')
  async editaInscricao(@Body() updateProfessoredto:UpdateProfessoreDto,
    @Param('id') id: string,
    @Request() req)
    {
      const professor_atualizado = await this.professoresService.update(updateProfessoredto,+id)
      return professor_atualizado
    }

  @Roles(Role.ROOT, Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('consultar-inscricao/:id')
  async findInscricaoData(@Param('id') id: string, @Request() req) {
    const professorData = this.professoresService.findUserDataById(+id) 
    return professorData;
  }  


}
