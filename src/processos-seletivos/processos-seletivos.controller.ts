import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProcessosSeletivosService } from './processos-seletivos.service';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscricoesService } from 'src/inscricoes/inscricoes.service';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt-auth.guard';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { Role, TipoHistorico } from '@prisma/client';
import { RolesGuard } from 'src/autenticacao/guards/roles.guard';
import { OptionalJwtAuthGuard } from 'src/autenticacao/guards/optional-jwt-auth.guard';

@Controller('processos-seletivos')
export class ProcessosSeletivosController {
  constructor(
    private readonly processosSeletivosService: ProcessosSeletivosService,
    private readonly inscricoesService: InscricoesService,
  ) {}

  @Post()
  create(@Body() createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return this.processosSeletivosService.create(createProcessosSeletivoDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const processos = await this.processosSeletivosService.findMany(
      {},
      req.user,
    );
    const result = {
      editais: {
        processos,
      },
    };
    return result;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('filtrado')
  async findAllfiltrado(@Request() req) {
    const processos_arquivados = await this.processosSeletivosService.findMany(
      {
        arquivado: true,
      },
      req.user,
    );
    const processos_ativos = await this.processosSeletivosService.findMany(
      {
        arquivado: false,
      },
      req.user,
    );
    const result = {
      editais: {
        em_andamento: processos_ativos,
        arquivados: processos_arquivados,
      },
    };
    return result;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.processosSeletivosService.findOne(+id, req.user);
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/inscricoes')
  async findinscricoes(@Param('id') id: string) {
    const processo = await this.processosSeletivosService.findOne(+id);
    const inscricoes = await this.inscricoesService.findMany(processo.id);
    return inscricoes;
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/resultado-final')
  async resultadofinal(@Param('id') id: string) {
    const processo = await this.processosSeletivosService.findOne(+id);
    const inscricoes = await this.inscricoesService.findMany(processo.id);

    inscricoes.sort((a, b) => (a.nota_final > b.nota_final) ? 1 : -1)
    
    var c = 1
    for (var i = (inscricoes.length-1); i >= 0; i--){
    inscricoes[i].classificacao = c
    c++
    }

    return inscricoes.reverse();
  }

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/inscricao')
  async findinscricaoaluno(@Param('id') id: string, @Request() req) {
    const processo = await this.processosSeletivosService.findOne(+id);
    const inscricao = await this.inscricoesService.findInscricaoId(
      req.user,
      processo.id,
    );
    return inscricao;
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/inscricoes/:id2')
  async findinscricao(@Param('id') id: string, @Param('id2') id2: string) {
    const processo = await this.processosSeletivosService.findOne(+id);
    const inscricao = await this.inscricoesService.findInscricaoAlunoId(
      processo.id,
      parseInt(id2),
    );
    return inscricao;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessosSeletivoDto: UpdateProcessosSeletivoDto,
  ) {
    return this.processosSeletivosService.update(
      +id,
      updateProcessosSeletivoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processosSeletivosService.remove(+id);
  }
}
