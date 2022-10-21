import { Module, forwardRef } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { ProcessosSeletivosModule } from 'src/processos-seletivos/processos-seletivos.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { SpacesModule } from 'src/SpacesModule/spaces.module';
import { HistoricoModule } from 'src/historico/historico.module';
import { ProducaoCientificaModule } from 'src/producao-cientifica/producao-cientifica.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    forwardRef(() => ProcessosSeletivosModule),
    AlunosModule,
    SpacesModule,
    HistoricoModule,
    ProducaoCientificaModule,
    UsuariosModule,
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
    })],
  controllers: [InscricoesController],
  providers: [InscricoesService],
  exports: [InscricoesService],
})
export class InscricoesModule {}
