import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, senha: string): Promise<any> {
    const usuario = await this.usuariosService.findOne(login);
    if (!usuario) return null;

    const senhaEstaCorreta = await bcrypt.compareSync(senha, usuario.senha);
    if (usuario && senhaEstaCorreta) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = {
      role: usuario.role,
      login: usuario.login,
      userId: usuario.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        role: usuario.role,
        id: usuario.id,
      },
    };
  }
}
