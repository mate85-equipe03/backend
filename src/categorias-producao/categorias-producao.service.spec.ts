import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasProducaoService } from './categorias-producao.service';

describe('CategoriasProducaoService', () => {
  let service: CategoriasProducaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasProducaoService],
    }).compile();

    service = module.get<CategoriasProducaoService>(CategoriasProducaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
