import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNiveisVagaDto } from './dto/create-niveis-vaga.dto';
import { UpdateNiveisVagaDto } from './dto/update-niveis-vaga.dto';
import { NiveisVaga } from './entities/niveis-vaga.entity';
import { NivelVaga} from '@prisma/client';


@Injectable()
export class NiveisVagaService {

  constructor(private prisma: PrismaService) {}
  

  create(createNiveisVagaDto: CreateNiveisVagaDto) {
    return this.prisma.nivelVaga.create({
      data: {
        name: createNiveisVagaDto.name
      },
    });
  }

  findAll(): Promise<NivelVaga[]> {
    return this.prisma.nivelVaga.findMany();
  }

  async findOne(id: number): Promise<NivelVaga> {
    const nivelVaga = await this.prisma.nivelVaga.findUnique({
      where: { id },
    });
    if (!nivelVaga)
      throw new HttpException('Nivel Vaga não encontrado', HttpStatus.NOT_FOUND);
    return nivelVaga;
  }

  async update(id: number, updateNiveisVagaDto: UpdateNiveisVagaDto) {
    await this.findOne(id);
    return this.prisma.nivelVaga.update({
      data: updateNiveisVagaDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.nivelVaga.delete({
      where: { id },
    });
    return `deleted`;
  }
}
