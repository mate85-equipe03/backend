import { Module } from '@nestjs/common';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { ProcessosSeletivosModule } from 'src/processos-seletivos/processos-seletivos.module';
import { AlunosModule } from 'src/alunos/alunos.module';

@Module({
  imports: [ProcessosSeletivosModule, AlunosModule],
  controllers: [InscricoesController],
  providers: [InscricoesService],
})
export class InscricoesModule {}
