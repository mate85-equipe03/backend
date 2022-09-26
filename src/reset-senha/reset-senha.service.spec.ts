import { Test, TestingModule } from '@nestjs/testing';
import { ResetSenhaService } from './reset-senha.service';

describe('ResetSenhaService', () => {
  let service: ResetSenhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetSenhaService],
    }).compile();

    service = module.get<ResetSenhaService>(ResetSenhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
