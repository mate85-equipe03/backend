import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoService } from '../autenticacao.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autenticacaoService: AutenticacaoService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const usuario = await this.autenticacaoService.validateUser(
      username,
      password,
    );

    if (!usuario) {
      throw new UnauthorizedException();
    }
    return usuario;
  }
}
