import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProducaoCientificaService {
  constructor(private prisma: PrismaService) {}
  create(inscricao_id: number, categorias_producao_id: number, url: string, filename: string) {
    return this.prisma.producaoCientifica.create({
      data: {
        inscricao_id,
        categorias_producao_id,
        url,
        filename,
      },
    });
  }
}
