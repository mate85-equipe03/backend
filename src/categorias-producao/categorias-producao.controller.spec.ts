import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasProducaoController } from './categorias-producao.controller';
import { CategoriasProducaoService } from './categorias-producao.service';

describe('CategoriasProducaoController', () => {
  let controller: CategoriasProducaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasProducaoController],
      providers: [CategoriasProducaoService],
    }).compile();

    controller = module.get<CategoriasProducaoController>(CategoriasProducaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
