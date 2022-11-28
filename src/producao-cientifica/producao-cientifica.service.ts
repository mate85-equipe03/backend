import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, ProducaoCientifica } from '@prisma/client';


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

  async findId(id: number): Promise<ProducaoCientifica> {
    return await this.prisma.producaoCientifica.findUnique({
      where: {
        id: id
      }
    });
    
  }

  async update(id: number,data): Promise<ProducaoCientifica> {
    return await this.prisma.producaoCientifica.update({
      where: {
        id: id
      },
      data: {
        categorias_producao_id:data.categorias_producao_id
      }
    });
    
  }

  async deleteProducao(where: Prisma.ProducaoCientificaWhereUniqueInput): Promise<ProducaoCientifica> {
    
    return this.prisma.producaoCientifica.delete({
      where,
    });
  }

  async removeByInscricao(inscricao_id: number) {
    return this.prisma.producaoCientifica.deleteMany({
      where: { 
        inscricao_id: inscricao_id },
    });
  }
}

