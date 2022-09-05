import { Module } from '@nestjs/common';
import { NiveisVagaService } from './niveis-vaga.service';
import { NiveisVagaController } from './niveis-vaga.controller';

@Module({
  controllers: [NiveisVagaController],
  providers: [NiveisVagaService]
})
export class NiveisVagaModule {}
