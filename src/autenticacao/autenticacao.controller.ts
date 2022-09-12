import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req);
    return this.autenticacaoService.login(req.user);
  }
}
