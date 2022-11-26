import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AlunosModule } from 'src/alunos/alunos.module';
import { ProfessoresModule } from 'src/professores/professores.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AutenticacaoController],
  imports: [
    UsuariosModule,
    AlunosModule,
    ProfessoresModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '14400s',
        },
      }),
    }),
  ],
  providers: [
    AutenticacaoService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    OptionalJwtAuthGuard,
  ],
})
export class AutenticacaoModule {}
