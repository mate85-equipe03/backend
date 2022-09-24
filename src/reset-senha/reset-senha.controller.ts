import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateResetSenhaDto } from './dto/create-reset-senha.dto';
import { UpdateResetSenhaDto } from './dto/update-reset-senha.dto';

@Controller('reset-senha')
export class ResetSenhaController {
  constructor(private readonly resetSenhaService: ResetSenhaService, private mailService: MailerService) {}

  @Post()
  async forgot(@Body() createsenhaData: CreateResetSenhaDto) {

   const resetSenha =  await this.resetSenhaService.createResetSenha(createsenhaData)

   const url = `https:localhost:3000/reset-senha/${resetSenha.token}`

    await this.mailService.sendMail({
      to: resetSenha.email,
      subject:'Resete sua senha',
      html:`Clique <a href="${url}"> aqui </a> pra resetar sua senha`,
    })

    return {message:url}
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
  update(@Param('id') id: string, @Body() updateResetSenhaDto: UpdateResetSenhaDto) {
    return this.resetSenhaService.update(+id, updateResetSenhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetSenhaService.remove(+id);
  }
}
