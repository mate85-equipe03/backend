import { Module } from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { EtapasController } from './etapas.controller';

@Module({
  controllers: [EtapasController],
  providers: [EtapasService],
  exports: [EtapasService]
})
export class EtapasModule {}
