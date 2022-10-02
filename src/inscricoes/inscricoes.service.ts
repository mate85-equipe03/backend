import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StatusInscricao } from '@prisma/client';
import { AlunosService } from 'src/alunos/alunos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessosSeletivosService } from 'src/processos-seletivos/processos-seletivos.service';

@Injectable()
export class InscricoesService {
  constructor(
    private prisma: PrismaService,
    private processosSeletivosService: ProcessosSeletivosService,
    private alunosService: AlunosService,
  ) {}

  async create(data, user) {
    
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
        historico_graduacao: data.historico_graduacao,
        historico_posgraduacao: data.historico_posgraduacao,
        producoes: { 
          createMany: [
             data.producoes 
          ]
        }
      },
      include: {
        producoes: true,
      }
    });
  }
}
