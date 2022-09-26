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
    //PROCESSO-SELETIVO: precisa checar se o ID é permitido INSCRICAO
    //STATUS-INCRICAO: Precisa procurar automaticamente o status "Enviada"
    //ALUNO: Precisa trocar: tem que pegar do JWT TOKEN e não do POST do form

    // Erro: "TypeError: Cannot read properties of undefined (reading 'areEligibleForEnrollment')"

    //if(this.processosSeletivosService.areEligibleForEnrollment(parseInt(data1.processo_seletivo_id))){
    //  return 1
    //}
    //else{
    //  return 0
    //}
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
    console.log(aluno);
    console.log(data);
    return this.prisma.inscricao.create({
      data: {
        url_enade: data.url_enade,
        url_lattes: data.url_enade,
        aluno_id: aluno.id,
        processo_seletivo_id: parseInt(data.processo_seletivo_id),
      },
    });
  }
}
