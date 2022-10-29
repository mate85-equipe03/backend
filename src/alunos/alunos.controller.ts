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
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { OptionalJwtAuthGuard } from 'src/autenticacao/guards/optional-jwt-auth.guard';


@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async signupUser(@Body() alunoData: CreateUsuarioDto): Promise<UsuarioModel> {
    return this.alunosService.createAluno(alunoData);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('consultar-inscricao')
  async findInscricaoData(@Request() req) {
    const user = req.user
    const alunoData = this.alunosService.findUserDataById(user.userId) 
    return alunoData;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Patch('editar-inscricao')
  async updateInscricao(@Body() alunoData: UpdateAlunoDto, @Request() req) {
    const user = req.user
    this.alunosService.update(alunoData,user.userId)
    const UserData = this.alunosService.findUserDataById(user.userId) 
    return UserData;
  }

}
