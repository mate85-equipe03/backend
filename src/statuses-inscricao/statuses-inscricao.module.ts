import { Module } from '@nestjs/common';
import { StatusesInscricaoService } from './statuses-inscricao.service';

@Module({
  providers: [StatusesInscricaoService]
})
export class StatusesInscricaoModule {}
