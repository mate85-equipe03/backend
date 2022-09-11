import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Usuario, Prisma} from '@prisma/client';


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

  async createUser (data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }
}
