import { Test, TestingModule } from '@nestjs/testing';
import { ResetSenhaController } from './reset-senha.controller';
import { ResetSenhaService } from './reset-senha.service';

describe('ResetSenhaController', () => {
  let controller: ResetSenhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetSenhaController],
      providers: [ResetSenhaService],
    }).compile();

    controller = module.get<ResetSenhaController>(ResetSenhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
