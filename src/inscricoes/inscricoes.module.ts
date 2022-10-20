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
        host:'localhost',
        port:1025
  
      },
      defaults:{
        from:'no-reply@postgress.com'
      }
    })],
  controllers: [InscricoesController],
  providers: [InscricoesService],
  exports: [InscricoesService],
})
export class InscricoesModule {}
