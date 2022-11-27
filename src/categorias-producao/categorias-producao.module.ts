import { Module } from '@nestjs/common';
import { CategoriasProducaoService } from './categorias-producao.service';
import { CategoriasProducaoController } from './categorias-producao.controller';

@Module({
  controllers: [CategoriasProducaoController],
  providers: [CategoriasProducaoService],
  exports: [CategoriasProducaoService]
})
export class CategoriasProducaoModule {}
