import { Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class EtapasService {
constructor(private prisma: PrismaService) {}
  
create(data,id) {
    return this.prisma.etapa.create({
      data: {
        processo_seletivo_id: parseInt(id),
        name: data.name,
        data_inicio: new Date(data.data_inicio),
        data_fim: new Date(data.data_fim),
      },
    });
  }

  findAll() {
    return this.prisma.etapa.findMany({
    });;
  }

  findOne(id: number) {
    return  this.prisma.etapa.findUnique({
        where: { id: id },
      });;
  }

  findAtual(edital_id: number) {
    const now = new Date();
    return  this.prisma.etapa.findFirst({
        where: {           
          AND: {
            processo_seletivo_id: {
              equals: edital_id,
            },
            data_inicio: {
              lte: now,
            },
            data_fim: {
              gte: now,
            },
          },
        }
    });
  }

  update(id: number, data) {
    return this.prisma.etapa.update({
      where: { id: id },
      data: {
        name: data.name,
        data_inicio: new Date(data.data_inicio),
        data_fim: new Date(data.data_fim),
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} etapa`;
  }
}
