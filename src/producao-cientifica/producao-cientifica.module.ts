import { Module } from '@nestjs/common';
import { ProducaoCientificaService } from './producao-cientifica.service';

@Module({
  providers: [ProducaoCientificaService],
  exports: [ProducaoCientificaService],
})
export class ProducaoCientificaModule {}
