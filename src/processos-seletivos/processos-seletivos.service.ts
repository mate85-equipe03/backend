import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProcessoSeletivo } from '@prisma/client';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';

@Injectable()
export class ProcessosSeletivosService {
  constructor(private prisma: PrismaService) {}

  create(createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return 'This action adds a new processosSeletivo';
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

  findMany(
    where: Prisma.ProcessoSeletivoWhereInput,
  ): Promise<ProcessoSeletivo[]> {
    const dataAtual = new Date();
    return this.prisma.processoSeletivo.findMany({
      include: {
        tipos_documento: {},
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
      },
      where,
    });
  }

  async findOne(id: number): Promise<ProcessoSeletivo> {
    const processoSeletivo = await this.prisma.processoSeletivo.findUnique({
      where: { id: id },
      include: {
        tipos_documento: {},
        etapas: {},
      },
    });

    if (!processoSeletivo)
      throw new HttpException(
        'Processo Seletivo não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return processoSeletivo;
  }

  update(id: number, updateProcessosSeletivoDto: UpdateProcessosSeletivoDto) {
    return `This action updates a #${id} processosSeletivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} processosSeletivo`;
  }
}
