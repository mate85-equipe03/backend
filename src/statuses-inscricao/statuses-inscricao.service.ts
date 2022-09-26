import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusInscricao, StatusInscricaoDesc } from '@prisma/client';

@Injectable()
export class StatusesInscricaoService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.statusInscricaoDesc.findMany();
  }

  async findOne(id: StatusInscricao): Promise<StatusInscricaoDesc> {
    const statusInscricao = await this.prisma.statusInscricaoDesc.findUnique({
      where: { id },
    });
    if (!statusInscricao)
      throw new HttpException(
        'Status de Inscrição não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return statusInscricao;
  }

  async findEnviada(): Promise<StatusInscricaoDesc> {
    const statusInscricao = await this.prisma.statusInscricaoDesc.findFirst({
      where: { id: StatusInscricao.ENVIADA },
    });
    if (!statusInscricao)
      throw new HttpException(
        'Status de Inscrição não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return statusInscricao;
  }
}
