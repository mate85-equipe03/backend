import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Usuario as UsuarioModel } from '@prisma/client';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { OptionalJwtAuthGuard } from 'src/autenticacao/guards/optional-jwt-auth.guard';


@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async signupUser(@Body() alunoData: CreateUsuarioDto): Promise<UsuarioModel> {
    return this.alunosService.createAluno(alunoData);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('consulta-inscricao')
  async findinscricaodata(@Request() req) {
    const user = req.user
    const alunoData = this.alunosService.findUserDataById(user.userId) 
    return alunoData;
  }

}
