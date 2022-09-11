import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario} from '@prisma/client';


@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) {}

  async findOne(login: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { login: login },
    });

    if (!usuario)
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return usuario;
  }

  async create (usuario: Usuario) {
    return null
  }
}
