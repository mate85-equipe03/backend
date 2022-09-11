import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Professor, Prisma} from '@prisma/client';

import { CreateProfessoreDto } from './dto/create-professore.dto';
import { UpdateProfessoreDto } from './dto/update-professore.dto';

@Injectable()
export class ProfessoresService {
  constructor (private prisma: PrismaService ) {}

  async professor(
    professorWhereUniqueInput: Prisma.ProfessorWhereUniqueInput,
  ): Promise<Professor | null> {
    return this.prisma.professor.findUnique({
      where: professorWhereUniqueInput,
    });
  }

  async createProfessor (data: Prisma.ProfessorCreateInput): Promise<Professor> {
    return this.prisma.professor.create({
      data,
    });
  }
}
