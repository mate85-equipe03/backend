import { Module } from '@nestjs/common';
import { ProcessosSeletivosService } from './processos-seletivos.service';
import { ProcessosSeletivosController } from './processos-seletivos.controller';
import { InscricoesModule } from 'src/inscricoes/inscricoes.module';
import { forwardRef } from '@nestjs/common';

@Module({
  controllers: [ProcessosSeletivosController],
  providers: [ProcessosSeletivosService],
  exports: [ProcessosSeletivosService],
  imports: [forwardRef(() => InscricoesModule)]
})
export class ProcessosSeletivosModule {}
