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
    return `This action returns all etapas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etapa`;
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
