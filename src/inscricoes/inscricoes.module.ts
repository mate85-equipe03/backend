import { Module, forwardRef } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { ProcessosSeletivosModule } from 'src/processos-seletivos/processos-seletivos.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { SpacesModule } from 'src/SpacesModule/spaces.module';
import { HistoricoModule } from 'src/historico/historico.module';
import { ProducaoCientificaModule } from 'src/producao-cientifica/producao-cientifica.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ProfessoresModule } from 'src/professores/professores.module';

@Module({
  imports: [
    forwardRef(() => ProcessosSeletivosModule),
    AlunosModule,
    ProfessoresModule,
    SpacesModule,
    HistoricoModule,
    ProducaoCientificaModule,
    UsuariosModule,
  ],
  controllers: [InscricoesController],
  providers: [InscricoesService],
  exports: [InscricoesService],
})
export class InscricoesModule {}
