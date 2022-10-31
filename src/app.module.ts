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
import { MailerModule } from '@nestjs-modules/mailer';

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
    MailerModule.forRoot({
      transport:{
        host: process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }  
      },
      defaults:{
        from: process.env.SMTP_NOREPLY,
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
