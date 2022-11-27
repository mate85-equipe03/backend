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
  Delete,
} from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { UpdateInscricaoDto } from './dto/update-inscricao.dto';
import { RevisaInscricaoDto } from './dto/revisa-inscricao.dto';
import { AuditaInscricaoDto } from './dto/audita-inscricao.dto';
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
import { MailerService } from '@nestjs-modules/mailer';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AlunosService } from 'src/alunos/alunos.service';
import { ProfessoresService } from 'src/professores/professores.service';


@Controller('inscricoes')
export class InscricoesController {
  constructor(
    private readonly inscricoesService: InscricoesService,
    private readonly spacesService: DoSpacesService,
    private readonly historicoService: HistoricoService,
    private readonly producaoCientificaService: ProducaoCientificaService,
    private processosSeletivosService: ProcessosSeletivosService,
    private mailService: MailerService,
    private usuarioService: UsuariosService,
    private alunosService: AlunosService,
    private professorService: ProfessoresService
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
            nota: createInscricaoDto.nota_historico_graduacao,
            tipo: TipoHistorico.GRADUACAO,
            filename: file.originalname,
          });
        }
      });
      files.historico_posgraduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          await this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            nota: createInscricaoDto.nota_historico_posgraduacao,
            tipo: TipoHistorico.POS_GRADUACAO,
            filename: file.originalname,
          });
        }
      });

      if (inscricao) {
        //Nao precisa disso, pois já tem lá em cima
        const usuario = await this.usuarioService.findOne(req.user.login);
        const processo = await this.processosSeletivosService.findOne(
          inscricao.processo_seletivo_id,
        );
        try {
          await this.mailService.sendMail({
            to: usuario.email,
            subject: 'Inscrição Realizada com Sucesso',
            html: `Parabéns. Sua inscrição no Processo Seletivo de Concessão de Bolsas do PGCOMP, ${processo.titulo} foi realizado com sucesso.`,
          });
          console.log('Email enviado para ' + usuario.email);
        } catch (e) {
          console.log('=====================');
          console.log('ERRO AO ENVIAR EMAIL:');
          console.log(process.env.SMTP_HOST);
          console.log(process.env.SMTP_PORT);
          console.log(process.env.SMTP_USER);
          console.log(process.env.SMTP_NOREPLY);
          console.log(e);
          console.log('=====================');
        } finally {
          return inscricao;
        }
      }
    }
  }

  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  @Header('Content-Type', 'multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'historico_graduacao_file' },
      { name: 'historico_posgraduacao_file' },
    ]),
  )
  async update(@UploadedFiles()files: {
    historico_graduacao_file?: Express.Multer.File[];
    historico_posgraduacao_file?: Express.Multer.File[];
  }, @Body() updateInscricaoDto: UpdateInscricaoDto, @Request() req) {
    const inscricao = await this.inscricoesService.update(updateInscricaoDto, req.user);
    try {
      this.historicoService.removeByInscricao(inscricao.id);
    } catch (error) {      
    }
    
    if (inscricao) {
      files.historico_graduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          await this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            nota: updateInscricaoDto.nota_historico_graduacao,
            tipo: TipoHistorico.GRADUACAO,
            filename: file.originalname,
          });
        }
      });
      files.historico_posgraduacao_file.forEach(async (file) => {
        const url = await this.spacesService.uploadFile(file);
        if (url) {
          await this.historicoService.create({
            inscricao_id: inscricao.id,
            url,
            nota: updateInscricaoDto.nota_historico_posgraduacao,
            tipo: TipoHistorico.POS_GRADUACAO,
            filename: file.originalname,
          });
        }
      });
    
    }


    return inscricao;
  
  
  
  }


  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/revisa-inscricao')
  async revisaInscricao(@Body() revisaInscricaoDto:RevisaInscricaoDto, @Request() req)
  {
    const inscricao_atualizada = await this.inscricoesService.update_revisao(revisaInscricaoDto,req.user)
    return inscricao_atualizada
  }

  @Roles(Role.PROFESSOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/audita-inscricao')
  async auditaInscricao(@Body() auditaInscricaoDto:AuditaInscricaoDto, @Request() req)
  {
    const inscricao = await this.inscricoesService.findOne(auditaInscricaoDto.id)
    const professor = await this.professorService.findProfessorByUserId(req.user.userId)

    if (inscricao.revisor_id) {
      if(inscricao.revisor_id != professor.id) {
    const inscricao_atualizada = await this.inscricoesService.audita_revisao(auditaInscricaoDto,req.user)
    return inscricao_atualizada 
      }
      else {
        throw new HttpException(
          'O professor auditor deve ser diferente do revisor',
          HttpStatus.FORBIDDEN,
        );
      }
  }
    else {
      throw new HttpException(
        'É preciso ser revisado por um professor, antes de auditar',
        HttpStatus.FORBIDDEN,
      );
    }
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
      +edital_id,
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
          file.originalname,
        );
        producoes.push(producao);
      }
    });
    return producoes;
  }


  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteInscricao(
    @Param('id') id: string,
    @Request() req,
  ) {

    const aluno = await this.alunosService.findAlunoByUserId(req.user.userId);
    const inscricao = await this.inscricoesService.findOne(+id);
    if(!inscricao){
      throw new HttpException(
        'Inscricão não existe',
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      !this.processosSeletivosService.areEligibleForEnrollment(
        inscricao.processo_seletivo_id,
      )
    ) {
      throw new HttpException(
        'Não é possível apagar inscrição, pois está fora do prazo',
        HttpStatus.UNAUTHORIZED,
      );
    }
      
    if(inscricao.aluno_id != aluno.id) {
      throw new HttpException(
        'Ação não permitida.',
        HttpStatus.FORBIDDEN,
      );
    }
    else{
      try {
        this.historicoService.removeByInscricao(inscricao.id);
        this.producaoCientificaService.removeByInscricao(inscricao.id);
        this.inscricoesService.deleteInscricao({ id: Number(id) })
        return {
          statusCode: HttpStatus.OK,
          message: "Inscrição deletada"
        }
      } catch (error) {
        
      }      
    }      
  }



  @Roles(Role.ALUNO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':inscricao_id/producoes/:id')
  async deleteProducao(
    @Param('id') id: string,
    @Param('inscricao_id') inscricao_id: string,
    @Request() req,
  ) {

    const producao = await this.producaoCientificaService.findId(+id); 
    if(!producao){
      throw new HttpException(
        'Documento não existe',
        HttpStatus.NOT_FOUND,
      );
    }
    else{
      const aluno = await this.alunosService.findAlunoByUserId(req.user.userId);
      const inscricao = await this.inscricoesService.findOne(+inscricao_id);
      if(!inscricao){
        throw new HttpException(
          'Inscricão não existe',
          HttpStatus.NOT_FOUND,
        );
      }
      
      if(producao.inscricao_id != inscricao.id || inscricao.aluno_id != aluno.id) {
        throw new HttpException(
          'Ação não permitida.',
          HttpStatus.FORBIDDEN,
        );
      }
      else{
        if (this.producaoCientificaService.deleteProducao({ id: Number(id) })){
          return {
            statusCode: HttpStatus.OK,
            message: "Documento deletado"
          }
        }
      }
      
    }
    
  }  
    
}
