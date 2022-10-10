import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Api do projeto de Seleção de Bolsistas PGCOMP - UFBA')
    .setVersion('0.0.1')
    .addTag('autenticacao')
    .addTag('usuarios')
    .addTag('niveis-vaga')
    .addTag('alunos')
    .addTag('professores')
    .addTag('processos-seletivos')
    .addTag('inscricoes')
    .addTag('etapas')
    .addTag('reset-senha')

    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
