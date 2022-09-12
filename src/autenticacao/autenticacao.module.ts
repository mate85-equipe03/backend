import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AutenticacaoController],
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3600s',
        },
      }),
    }),
  ],
  providers: [AutenticacaoService, LocalStrategy],
})
export class AutenticacaoModule {}
