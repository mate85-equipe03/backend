import {
  HttpException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateResetSenhaDto } from './dto/create-reset-senha.dto';
import { UpdateResetSenhaDto } from './dto/update-reset-senha.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reset-senha')
@Controller('reset-senha')
export class ResetSenhaController {
  constructor(
    private readonly resetSenhaService: ResetSenhaService,
    private userService: UsuariosService,
    private mailService: MailerService,
  ) {}

  @Post('')
  async forgot(@Body() createsenhaData: CreateResetSenhaDto) {
    const resetSenha = await this.resetSenhaService.createResetSenha(
      createsenhaData,
    );

    const url = `https:localhost:3000/reset-senha/${resetSenha.token}`;

    await this.mailService.sendMail({
      to: resetSenha.email,
      subject: 'Resete sua senha',
      html: `Clique <a href="${url}"> aqui </a> pra resetar sua senha`,
    });

    return { message: url };
  }

  @Post('recuperar')
  async reset(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_match') password_match: string,
  ) {
    if (password !== password_match) {
      throw new BadRequestException('As senhas não conferem');
    }

    const reset = await this.resetSenhaService.findtoken(token);
    const email = reset.email;
    const user = await this.userService.findbyMail(email);
    const hashpassword = await bcrypt.hashSync(password, 10);

    await this.userService.update(user.id, { senha: hashpassword });

    return { message: 'senha alterada com sucesso' };
  }

  @Get()
  findAll() {
    return this.resetSenhaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetSenhaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResetSenhaDto: UpdateResetSenhaDto,
  ) {
    return this.resetSenhaService.update(+id, updateResetSenhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetSenhaService.remove(+id);
  }
}
