import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessosSeletivosService } from 'src/processos-seletivos/processos-seletivos.service';
import { StatusesInscricaoService } from 'src/statuses-inscricao/statuses-inscricao.service';



@Injectable()
export class InscricoesService {

  constructor(private prisma: PrismaService){}

  private readonly processosSeletivosService: ProcessosSeletivosService
  private readonly statusInscricao: StatusesInscricaoService


  async create(data1){

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
   

    return this.prisma.inscricao.create({      
      data:{
        url_enade:            data1.url_enade,
        url_lattes:           data1.url_enade,
        status_id:            1, //tem que pegar "StatusesInscricaoService.findEnviada"
        aluno_id:             parseInt(data1.aluno_id),
        processo_seletivo_id: parseInt(data1.processo_seletivo_id)
      }
    });    
  }  

  
 
}
