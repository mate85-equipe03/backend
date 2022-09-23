import { Module } from '@nestjs/common';
import { ProcessosSeletivosService } from './processos-seletivos.service';
import { ProcessosSeletivosController } from './processos-seletivos.controller';

@Module({
  controllers: [ProcessosSeletivosController],
  providers: [ProcessosSeletivosService],
  exports:  [ProcessosSeletivosModule],
})
export class ProcessosSeletivosModule {}
