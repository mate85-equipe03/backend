import {
  Controller,
  Post,
  Body,
  Request,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Header,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';
import { JwtAuthGuard } from 'src/autenticacao/guards/jwt-auth.guard';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { Role, TipoHistorico } from '@prisma/client';
import { RolesGuard } from 'src/autenticacao/guards/roles.guard';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { DoSpacesService } from 'src/SpacesModule/SpacesService/doSpacesService';
import { HistoricoService } from 'src/historico/historico.service';
import { CreateProducaoDto } from './dto/create-producao.dto';
import { ProcessosSeletivosService } from 'src/processos-seletivos/processos-seletivos.service';
import { ProducaoCientificaService } from 'src/producao-cientifica/producao-cientifica.service';

@Controller('inscricoes')
export class InscricoesController {
  constructor(
    private readonly inscricoesService: InscricoesService,
    private readonly spacesService: DoSpacesService,
    private readonly historicoService: HistoricoService,
    private readonly producaoCientificaService: ProducaoCientificaService,
    private processosSeletivosService: ProcessosSeletivosService,
  ) {}

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'historico_graduacao_file' },
      { name: 'historico_posgraduacao_file' },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      historico_graduacao_file?: Express.Multer.File[];
      historico_posgraduacao_file?: Express.Multer.File[];
    },
    @Body() createInscricaoDto: CreateInscricaoDto,
    @Request() req,
  ) {
    const inscricao = await this.inscricoesService.create(
      createInscricaoDto,
      req.user,
    );
    if (inscricao) {
      files.historico_graduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          await this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            tipo: TipoHistorico.GRADUACAO,
          });
        }
      });
      files.historico_posgraduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          await this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            tipo: TipoHistorico.POS_GRADUACAO,
          });
        }
      });
    }
  }

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  update(@Body() updateInscricaoDto: UpdateInscricaoDto, @Request() req) {
    return this.inscricoesService.update(updateInscricaoDto, req.user);
  }

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/producoes')
  @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  async createProducaoCientifica(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() { categorias_producao_id, edital_id }: CreateProducaoDto,
    @Request() req,
  ) {
    const inscricao = await this.inscricoesService.findInscricaoId(
      req.user,
      edital_id,
    );
    const acceptCategoria =
      await this.processosSeletivosService.hasCategoriaProducao(
        inscricao.processo_seletivo_id,
        categorias_producao_id,
      );
    if (!acceptCategoria)
      throw new HttpException(
        'Processo Seletivo não aceita produções dessa categoria',
        HttpStatus.UNAUTHORIZED,
      );
    const producoes = [];
    files.forEach(async (file) => {
      const url = await this.spacesService.uploadFile(file);
      if (url) {
        const producao = await this.producaoCientificaService.create(
          inscricao.id,
          +categorias_producao_id,
          url,
        );
        producoes.push(producao);
      }
    });
    return producoes;
  }
}
