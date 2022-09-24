import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Usuario } from '@prisma/client';
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
        senha: data['senha'],
        telefone: data['telefone'],
        aluno: {
          create: { matricula: data['matricula'],
                    curso: data['curso'], 
                    lattes_link: data['lattes_link'],
                    semestre_pgcomp: data['semestre_pgcomp']
        },    
        },
      },
    });
  }
}
