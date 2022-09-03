import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NiveisVagaModule } from './niveis-vaga/niveis-vaga.module';

@Module({
  imports: [NiveisVagaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
