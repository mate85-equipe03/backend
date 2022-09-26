import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario as UserModel } from '@prisma/client';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.usuariosService.findOne(login);
  }
}
