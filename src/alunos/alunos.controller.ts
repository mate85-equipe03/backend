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
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async signupUser(@Body() alunoData: CreateAlunoDto): Promise<UsuarioModel> {
    return this.alunosService.createAluno(alunoData);
  }
}
