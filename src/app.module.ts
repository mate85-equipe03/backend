import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NiveisVagaModule } from './niveis-vaga/niveis-vaga.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { ProcessosSeletivosModule } from './processos-seletivos/processos-seletivos.module';

@Module({
  imports: [
    PrismaModule,
    AutenticacaoModule,
    NiveisVagaModule,
    UsuariosModule,
    AlunosModule,
    ProfessoresModule,
    ProcessosSeletivosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
