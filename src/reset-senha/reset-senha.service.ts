import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, ResetSenha } from '@prisma/client';
import { CreateResetSenhaDto } from './dto/create-reset-senha.dto';
import { UpdateResetSenhaDto } from './dto/update-reset-senha.dto';

@Injectable()
export class ResetSenhaService {
  constructor(private prisma: PrismaService) {}



  async createResetSenha(data): Promise<ResetSenha> {


    return await this.prisma.resetSenha.create({
      data:{
          email: data['email'],
          token: (Math.random() + 1).toString(36).substring(9)
    }})
  }

  findAll() {
    return `This action returns all resetSenha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetSenha`;
  }

  async findtoken(token: string): Promise<ResetSenha> {
    const resetsenha = await this.prisma.resetSenha.findFirst({
      where: { token },
    });
    if (!resetsenha)
      throw new HttpException(
        'Token não encontrado',
        HttpStatus.NOT_FOUND,
      );
    return resetsenha;
  }
  

  update(id: number, updateResetSenhaDto: UpdateResetSenhaDto) {
    return `This action updates a #${id} resetSenha`;
  }

  remove(id: number) {
    return `This action removes a #${id} resetSenha`;
  }
}
