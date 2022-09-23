import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusInscricao } from '@prisma/client';


@Injectable()
export class StatusesInscricaoService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.statusInscricao.findMany();
  }

  async findOne(id: number): Promise<StatusInscricao> {
    const statusInscricao = await this.prisma.statusInscricao.findUnique({
      where: { id },
    });
    if (!statusInscricao)
      throw new HttpException(
        'Status de Inscrição não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return statusInscricao;
  }

  async findEnviada(): Promise<StatusInscricao> {
    const statusInscricao = await this.prisma.statusInscricao.findFirst({
      where: { name: "Enviada" },
    });
    if (!statusInscricao)
      throw new HttpException(
        'Status de Inscrição não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return statusInscricao;
  }
}
