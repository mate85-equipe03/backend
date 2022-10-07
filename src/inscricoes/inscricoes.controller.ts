import {
  Controller,
  Post,
  Body,
  Request,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
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

@Controller('inscricoes')
export class InscricoesController {
  constructor(
    private readonly inscricoesService: InscricoesService,
    private readonly spacesService: DoSpacesService,
    private readonly historicoService: HistoricoService,
  ) {}

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
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
          this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            tipo: TipoHistorico.GRADUACAO,
          });
        }
      });
      files.historico_posgraduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          this.historicoService.create({
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
}
