import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProcessoSeletivo } from '@prisma/client';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';


@Injectable()
export class ProcessosSeletivosService {

  constructor(private prisma: PrismaService) {}


  create(createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return 'This action adds a new processosSeletivo';
  }

  findarquivados(): Promise<ProcessoSeletivo[]> {
    return this.prisma.processoSeletivo.findMany({
      where:{
        arquivado:true
      }
  });
  }

  findativos(): Promise<ProcessoSeletivo[]> {
    return this.prisma.processoSeletivo.findMany({
      where:{
        arquivado:false
      }
  });
  }

  async findOne(id: number): Promise<ProcessoSeletivo> {

    const processoSeletivo = await this.prisma.processoSeletivo.findUnique({
      where: { id: id },
    });

    if (!processoSeletivo)
      throw new HttpException('Processo Seletivo não encontrado', HttpStatus.NOT_FOUND);
    return processoSeletivo;

  }

  update(id: number, updateProcessosSeletivoDto: UpdateProcessosSeletivoDto) {
    return `This action updates a #${id} processosSeletivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} processosSeletivo`;
  }
}
