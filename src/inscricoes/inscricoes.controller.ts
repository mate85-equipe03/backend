import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt-auth.guard';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/autenticacao/guards/roles.guard';

@Controller('inscricoes')
export class InscricoesController {
  constructor(private readonly inscricoesService: InscricoesService) {}

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createInscricaoDto: CreateInscricaoDto, @Request() req) {
    return this.inscricoesService.create(createInscricaoDto, req.user);
  }
}
