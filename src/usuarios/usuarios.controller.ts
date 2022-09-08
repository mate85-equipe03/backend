import { Controller, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.usuariosService.findOne(login);
  }
}
