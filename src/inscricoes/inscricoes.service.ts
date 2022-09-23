import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inscricao } from '@prisma/client';


@Injectable()
export class InscricoesService {

  constructor(private prisma: PrismaService){}

  async create(data1){

    //PROCESSO-SELETIVO: precisa checar se o ID é permitido INSCRICAO
    //STATUS-INCRICAO: Precisa procurar automaticamente o status "Enviada"
    //ALUNO: Precisa trocar: tem que pegar do JWT TOKEN e não do POST do form

    return this.prisma.inscricao.create({      
      data:{
        url_enade:            data1.url_enade,
        url_lattes:           data1.url_enade,
        status_id:            1,
        aluno_id:             parseInt(data1.aluno_id),
        processo_seletivo_id: parseInt(data1.processo_seletivo_id)
      }
    });    
  }  

  
 
}
