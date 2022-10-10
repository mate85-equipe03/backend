import { Test, TestingModule } from '@nestjs/testing';
import { ProducaoCientificaService } from './producao-cientifica.service';

describe('ProducaoCientificaService', () => {
  let service: ProducaoCientificaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducaoCientificaService],
    }).compile();

    service = module.get<ProducaoCientificaService>(ProducaoCientificaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
