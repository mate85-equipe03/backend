import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async usuario(
    usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
    });
  }

  async findOne(login: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { login: login },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async findbyMail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: email },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    data.senha = await bcrypt.hashSync(data.senha, 10);
    return this.prisma.usuario.create({
      data,
    });
  }

  async update(id: number, data): Promise<Usuario> {
    return await this.prisma.usuario.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
