import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inscricao, StatusInscricao } from '@prisma/client';
import { AlunosService } from 'src/alunos/alunos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Historico } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { ProcessosSeletivosService } from 'src/processos-seletivos/processos-seletivos.service';

@Injectable()
export class InscricoesService {
  constructor(
    private prisma: PrismaService,
    private processosSeletivosService: ProcessosSeletivosService,
    private alunosService: AlunosService,
  ) {}

  async create(data, user): Promise<Inscricao> {
    if (
      !this.processosSeletivosService.areEligibleForEnrollment(
        data.processo_seletivo_id,
      )
    ) {
      throw new HttpException(
        'Processo Seletivo fora da data de inscrição',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const aluno = await this.alunosService.findAlunoByUserId(user.userId);

    return this.prisma.inscricao.create({
      data: {
        url_enade: data.url_enade,
        url_lattes: data.url_enade,
        aluno_id: aluno.id,
        processo_seletivo_id: parseInt(data.processo_seletivo_id),
      },
    });
  }

  async findInscricaoId(user, ps_id): Promise<Inscricao> {
    const aluno = await this.alunosService.findAlunoByUserId(user.userId);
    return this.prisma.inscricao.findFirst({
      where: {
        AND: {
          aluno_id: aluno.id,
          processo_seletivo_id: ps_id,
        },
      },
      include: {
        Historico: true,
        aluno: true,
      },
    });
  }

  async findInscricaoAlunoId(id1, id2): Promise<Inscricao> {
    return this.prisma.inscricao.findFirst({
      where: {
        AND: {
          id: id2,
          processo_seletivo_id: id1,
        },
      },
      include: {
        Historico: true,
        aluno: true,
      },
    });
  }

  async findOne(id: number): Promise<Inscricao> {
    const inscricao = await this.prisma.inscricao.findUnique({
      where: { id },
    });
    if (!inscricao)
      throw new HttpException('Inscrição não encontrada', HttpStatus.NOT_FOUND);
    return inscricao;
  }

  findMany(id: number): Promise<Inscricao[]> {
    return this.prisma.inscricao.findMany({
      where: {
        processo_seletivo_id: id,
      },
      include: {
        Historico: true,
        aluno: true,
      },
    });
  }

  async update(data, user) {
    if (
      !this.processosSeletivosService.areEligibleForEnrollment(
        data.processo_seletivo_id,
      )
    ) {
      throw new HttpException(
        'Processo Seletivo fora da data de inscrição',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const inscricao = await this.findInscricaoId(user.userId, data);

    return this.prisma.inscricao.update({
      where: { id: inscricao.id },
      data: {
        url_enade: data.url_enade,
        url_lattes: data.url_lattes,
      },
    });
  }
}
