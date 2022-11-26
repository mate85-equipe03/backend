import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProcessoSeletivo } from '@prisma/client';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';

@Injectable()
export class ProcessosSeletivosService {
  constructor(private prisma: PrismaService) {}

  create(createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
      return this.prisma.processoSeletivo.create({
        data: {
          titulo: createProcessosSeletivoDto.titulo,
          semestre: createProcessosSeletivoDto.semestre,
          descricao: createProcessosSeletivoDto.descricao,
          edital_url: createProcessosSeletivoDto.edital_url,
          categorias_producao: {
            create: [
              { nome: 'Publicação A1', pontuacao: 10.0 },
              { nome: 'Publicação A2', pontuacao: 8.75 },
              { nome: 'Publicação A3', pontuacao: 8.75 },
              { nome: 'Publicação B1', pontuacao: 6.75 },
            ],
          },
        }
      });
  }


  async update(updateProcessosSeletivoDto:UpdateProcessosSeletivoDto, Id) {

    return this.prisma.processoSeletivo.update({
      where: { id: Id, },
      data: {
        titulo: updateProcessosSeletivoDto.titulo,
        semestre: updateProcessosSeletivoDto.semestre,
        descricao: updateProcessosSeletivoDto.descricao,
        edital_url: updateProcessosSeletivoDto.edital_url,
      },
    });
  }

  areEligibleForEnrollment(id: number) {
    const now = new Date();

    const processoSeletivo = this.prisma.processoSeletivo.findUnique({
      where: { id: id },
      include: {
        etapas: {
          where: {
            AND: {
              data_inicio: {
                lte: now,
              },
              data_fim: {
                gte: now,
              },
            },
          },
        },
      },
    });

    if (!processoSeletivo) return false;
    return true;
  }

  async findMany(where: Prisma.ProcessoSeletivoWhereInput, user?: any) {
    const userId = user && user.role === 'ALUNO' ? user.userId : -1;

    const dataAtual = new Date();
    const processos = await this.prisma.processoSeletivo.findMany({
      include: {
        categorias_producao: {},
        etapas: {
          where: {
            AND: {
              data_inicio: {
                lte: dataAtual,
              },
              data_fim: {
                gte: dataAtual,
              },
            },
          },
        },
        inscricoes: {
          where: {
            aluno: {
              userId,
            },
          },
        },
      },
      where,
    });
    return processos.map((processo) => {
      const { inscricoes, ...result } = processo;
      if (user && user.role === 'ALUNO') {
        const isInscrito = inscricoes.length > 0;
        return {
          ...result,
          isInscrito,
          idInscricao: isInscrito ? inscricoes[0].id : null,
        };
      }
      return result;
    });
  }

  async findOne(id: number, user?: any) {
    const userId = user && user.role === 'ALUNO' ? user.userId : -1;
    const processoSeletivo = await this.prisma.processoSeletivo.findUnique({
      where: { id: id },
      include: {
        categorias_producao: {},
        etapas: {},
        inscricoes: {
          where: {
            aluno: {
              userId,
            },
          },
        },
      },
    });

    if (!processoSeletivo)
      throw new HttpException(
        'Processo Seletivo não encontrado',
        HttpStatus.NOT_FOUND,
      );

    const { inscricoes, ...result } = processoSeletivo;
    if (user && user.role === 'ALUNO'){
      const isInscrito = inscricoes.length > 0;
      return {
        ...result,
        isInscrito,
        idInscricao: isInscrito ? inscricoes[0].id : null,
      };
    }
    return result;
  }


  remove(id: number) {
    return `This action removes a #${id} processosSeletivo`;
  }

  async hasCategoriaProducao(
    processo_seletivo_id: number,
    categorias_producao_id: number,
  ): Promise<boolean> {
    const processoSeletivo = await this.prisma.processoSeletivo.findUnique({
      where: { id: processo_seletivo_id },
      include: {
        categorias_producao: true,
      },
    });
    if (!processoSeletivo)
      throw new HttpException(
        'Processo Seletivo não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return processoSeletivo.categorias_producao.some(
      (categoria) => categoria.id == categorias_producao_id,
    );
  }
}
