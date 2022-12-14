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
import { EtapasService } from 'src/etapas/etapas.service';
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
    private readonly etapasService: EtapasService
  ) {}
  
  @Roles(Role.PROFESSOR,Role.ROOT)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

    var etapas = [];
    for (var i = 1; i <= processos.length; i++){

      var processo = await this.processosSeletivosService.findOne(i)

      if(processo.resultado_liberado){
        etapas.push(await this.etapasService.findEtapaResultado(i));
      }
      else{
        var etapa = await this.etapasService.findAtual(i);
        if(etapa.name == "Resultado Final"){
          etapas.push({
            "id": 999999,
            "processo_seletivo_id": i,
            "name": "Resultado Final em breve",
            "data_inicio": "",
            "data_fim": "",          
          });
        }
        else{
          etapas.push(etapa);
        }
      }      
    }
  
    const result = {
      editais: {
        processos,
      },
      etapas_atuais: {
        etapas
      }
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
  @Get(':id/etapa-atual')
  async getEtapaAtual(@Param('id') id: string, @Request() req) {
    const processo = await this.processosSeletivosService.findOne(+id);

    if(processo.resultado_liberado){
      return await this.etapasService.findEtapaResultado(+id);
    }
    else{
      const etapa = await this.etapasService.findAtual(+id);
      if(etapa.name == "Resultado Final"){
        return {
          "id": 999999,
          "processo_seletivo_id": id,
          "name": "Resultado Final em breve",
          "data_inicio": "",
          "data_fim": "",          
        };
      }
      else{
        return etapa;
      }
    }
    
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
  @Patch(':id/liberar-resultado-final')
  liberarResultadoFinal(@Param('id') id: string) {
    return this.processosSeletivosService.updateFlagResultado(+id, true);
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/nao-liberar-resultado-final')
  naoLiberarResultadoFinal(@Param('id') id: string) {
    return this.processosSeletivosService.updateFlagResultado(+id, false);
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/resultado-final-mestrado')
  async resultadofinalmestado(@Param('id') id: string) {
    const processo = await this.processosSeletivosService.findOne(+id);

    if(!processo.resultado_liberado){
      return {"message": "Resultado final ainda n??o disponibilizado"}
    }

    const inscricoes = await this.inscricoesService.findManyMestrado(processo.id);

    inscricoes.sort((a, b) => (a.nota_final > b.nota_final) ? 1 : -1)
    
    var c = 1
    for (var i = (inscricoes.length-1); i >= 0; i--){
    inscricoes[i].classificacao = c
    c++
    }

    return inscricoes.reverse();
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/resultado-final-doutorado')
  async resultadofinaldoutorado(@Param('id') id: string) {
    const processo = await this.processosSeletivosService.findOne(+id);

    if(!processo.resultado_liberado){
      return {"message": "Resultado final ainda n??o disponibilizado"}
    }

    const inscricoes = await this.inscricoesService.findManyDoutorado(processo.id);

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

  @Roles(Role.PROFESSOR,Role.ROOT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessosSeletivoDto:UpdateProcessosSeletivoDto) {
    return this.processosSeletivosService.update(updateProcessosSeletivoDto,+id);
  }

  @Roles(Role.PROFESSOR,Role.ROOT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':edital_id/etapas/:id')
  update_etapa(
    @Param('edital_id') edital_id: string,
    @Param('id') id: string,
    @Body() data,
  ) {
    return this.etapasService.update(+id, data);
  }
  

  @Roles(Role.PROFESSOR,Role.ROOT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processosSeletivosService.remove(+id);
  }
}
