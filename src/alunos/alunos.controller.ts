import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Usuario as UsuarioModel} from '@prisma/client';

import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post('aluno')
  async signupUser(
    @Body() alunoData: { login: string; email: string, senha: string, siape: string},
  ): Promise<UsuarioModel> {
    return this.alunosService.createAluno(alunoData);
  }

}
