import { Module } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { ProcessosSeletivosModule } from 'src/processos-seletivos/processos-seletivos.module';

@Module({
  imports:  [ProcessosSeletivosModule],
  controllers: [InscricoesController],
  providers: [InscricoesService]
})
export class InscricoesModule {}
