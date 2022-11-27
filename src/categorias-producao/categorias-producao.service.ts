import { Injectable } from '@nestjs/common';
import { CreateCategoriasProducaoDto } from './dto/create-categorias-producao.dto';
import { UpdateCategoriasProducaoDto } from './dto/update-categorias-producao.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriasProducaoService {
  constructor(private prisma: PrismaService) {}

  create(createCategoriasProducaoDto: CreateCategoriasProducaoDto) {
    return 'This action adds a new categoriasProducao';
  }

  findAll() {
    return this.prisma.categoriaProducao.findMany({
    });;
  }

  findOne(id: number) {
    return  this.prisma.categoriaProducao.findUnique({
      where: { id: id },
    });;
  }

  update(id: number, data) {
    return this.prisma.categoriaProducao.update({
      where: { id: id },
      data: {
        nome: data.nome,
        pontuacao: data.pontuacao,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} categoriasProducao`;
  }
}
