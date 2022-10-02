import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      'Endpoints do projeto Sistema de Seleção de Bolsistas - PGCOMP UFBA',
    )
    .setVersion('0.0.1')
    .addTag('bolsas')
    .addTag('usuarios')
    .addTag('alunos')
    .addTag('autenticacao')
    .addTag('etapas')
    .addTag('inscricoes')
    .addTag('niveis-vaga')
    .addTag('processos-seletivos')
    .addTag('professores')
    .addTag('reset-senha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
