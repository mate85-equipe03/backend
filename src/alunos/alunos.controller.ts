import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Usuario as UsuarioModel } from '@prisma/client';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post('aluno')
  async signupUser(@Body() alunoData: CreateUsuarioDto): Promise<UsuarioModel> {
    return this.alunosService.createAluno(alunoData);
  }
}
