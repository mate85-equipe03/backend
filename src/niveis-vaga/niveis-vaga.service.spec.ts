import { Test, TestingModule } from '@nestjs/testing';
import { NiveisVagaService } from './niveis-vaga.service';

describe('NiveisVagaService', () => {
  let service: NiveisVagaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveisVagaService],
    }).compile();

    service = module.get<NiveisVagaService>(NiveisVagaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
