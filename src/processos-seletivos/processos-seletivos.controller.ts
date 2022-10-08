import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
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

  @Get()
  async findAllfiltrado() {
    const processos_arquivados = await this.processosSeletivosService.findMany({
      arquivado: true,
    });
    const processos_ativos = await this.processosSeletivosService.findMany({
      arquivado: false,
    });
    const result = {
      editais: {
        em_andamento: processos_ativos,
        arquivados: processos_arquivados,
      },
    };
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processosSeletivosService.findOne(+id);
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/inscricoes')
  async findinscricoes(@Param('id') id: string) {
  const processo = await this.processosSeletivosService.findOne(+id);
  const inscricoes = await this.inscricoesService.findMany(processo.id)
  return inscricoes
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/inscricoes/:id2')
  async findinscricao(@Param('id') id: string,@Param('id2') id2: string) {
  const processo = await this.processosSeletivosService.findOne(+id);
  const inscricao = await this.inscricoesService.findInscricaoAlunoId(processo.id, parseInt(id2))
  return inscricao
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
