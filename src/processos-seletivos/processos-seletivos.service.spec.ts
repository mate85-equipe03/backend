import { Test, TestingModule } from '@nestjs/testing';
import { ProcessosSeletivosService } from './processos-seletivos.service';

describe('ProcessosSeletivosService', () => {
  let service: ProcessosSeletivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessosSeletivosService],
    }).compile();

    service = module.get<ProcessosSeletivosService>(ProcessosSeletivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
