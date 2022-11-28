import { Injectable } from '@nestjs/common';
import { TipoHistorico } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoricoService {
  constructor(private prisma: PrismaService) {}

  create(data: { inscricao_id: number; tipo: TipoHistorico; filename: string; nota: string; url: string }) {
    return this.prisma.historico.create({
      data: {
        inscricao_id: data.inscricao_id,
        tipo: data.tipo,
        url: data.url,
        nota: data.nota,
        filename: data.filename,
      },
    });
  }

  async removeByInscricao(inscricao_id: number) {
    return this.prisma.historico.deleteMany({
      where: { 
        inscricao_id: inscricao_id },
    });
  }


}
