import { Module } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { ResetSenhaController } from './reset-senha.controller';

@Module({
  controllers: [ResetSenhaController],
  providers: [ResetSenhaService]
})
export class ResetSenhaModule {}
