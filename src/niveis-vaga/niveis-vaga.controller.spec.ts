import { Test, TestingModule } from '@nestjs/testing';
import { NiveisVagaController } from './niveis-vaga.controller';
import { NiveisVagaService } from './niveis-vaga.service';

describe('NiveisVagaController', () => {
  let controller: NiveisVagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveisVagaController],
      providers: [NiveisVagaService],
    }).compile();

    controller = module.get<NiveisVagaController>(NiveisVagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
