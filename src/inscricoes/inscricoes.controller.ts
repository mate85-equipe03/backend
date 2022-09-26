import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt-auth.guard';

@Controller('inscricoes')
export class InscricoesController {
  constructor(private readonly inscricoesService: InscricoesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInscricaoDto: CreateInscricaoDto, @Request() req) {
    return this.inscricoesService.create(createInscricaoDto, req.user);
  }
}
