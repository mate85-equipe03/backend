import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NiveisVagaModule } from './niveis-vaga/niveis-vaga.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ProcessosSeletivosModule } from './processos-seletivos/processos-seletivos.module';
import { EtapasModule } from './etapas/etapas.module';
import { StatusesInscricaoModule } from './statuses-inscricao/statuses-inscricao.module';
import { InscricoesModule } from './inscricoes/inscricoes.module';
import { ResetSenhaModule } from './reset-senha/reset-senha.module';
import { SpacesModule } from './SpacesModule/spaces.module';
import { HistoricoModule } from './historico/historico.module';
import { ProducaoCientificaModule } from './producao-cientifica/producao-cientifica.module';


@Module({
  imports: [
    PrismaModule,
    AutenticacaoModule,
    NiveisVagaModule,
    UsuariosModule,
    AlunosModule,
    ProfessoresModule,
    ProcessosSeletivosModule,
    EtapasModule,
    StatusesInscricaoModule,
    InscricoesModule,
    ResetSenhaModule,
    SpacesModule,
    HistoricoModule,
    ProducaoCientificaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
