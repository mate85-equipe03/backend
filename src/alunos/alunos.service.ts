import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Aluno, Role, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(private prisma: PrismaService) {}

  async createAluno(data): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: {
        login: data['login'],
        email: data['email'],
        senha: bcrypt.hashSync(data['senha'], 10),
        telefone: data['telefone'],
        role: Role.ALUNO,
        aluno: {
          create: {
            matricula: data['matricula'],
            nome: data['nome'],
            curso: data['curso'],
            lattes_link: data['lattes_link'],
            semestre_pgcomp: data['semestre_pgcomp'],
          },
        },
      },
    });
  }

  async findAlunoByUserId(userId): Promise<Aluno> {
    return this.prisma.aluno.findUnique({
      where: {
        userId: userId,
      },
    });
  }
}
