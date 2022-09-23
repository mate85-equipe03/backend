import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inscricao } from '@prisma/client';


@Injectable()
export class InscricoesService {

  constructor(private prisma: PrismaService){}

  //async create(data): Promise<Inscricao> {
  //  return this.prisma.inscricao.create({
  //    data: {
  //      url_lattes: data['url_lattes'],        
  //   },
  //  });
  //}  
 
}
