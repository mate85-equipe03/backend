import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario, Professor, Prisma } from '@prisma/client';

import { CreateProfessoreDto } from './dto/create-professore.dto';
import { UpdateProfessoreDto } from './dto/update-professore.dto';

@Injectable()
export class ProfessoresService {
  constructor(private prisma: PrismaService) {}

  async createProfessor(data): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: {
        login: data['login'],
        email: data['email'],
        senha: bcrypt.hashSync(data['senha'], 10),
        telefone: data['telefone'],
        professor: {
          create: { siape: data['siape'] },
        },
      },
    });
  }

}
