import { Module, forwardRef } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { ProcessosSeletivosModule } from 'src/processos-seletivos/processos-seletivos.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { SpacesModule } from 'src/SpacesModule/spaces.module';
import { HistoricoModule } from 'src/historico/historico.module';

@Module({
  imports: [
    forwardRef(() => ProcessosSeletivosModule),
    AlunosModule,
    SpacesModule,
    HistoricoModule,
  ],
  controllers: [InscricoesController],
  providers: [InscricoesService],
  exports: [InscricoesService]
})
export class InscricoesModule {}
