import { Test, TestingModule } from '@nestjs/testing';
import { ProcessosSeletivosController } from './processos-seletivos.controller';
import { ProcessosSeletivosService } from './processos-seletivos.service';

describe('ProcessosSeletivosController', () => {
  let controller: ProcessosSeletivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessosSeletivosController],
      providers: [ProcessosSeletivosService],
    }).compile();

    controller = module.get<ProcessosSeletivosController>(ProcessosSeletivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
