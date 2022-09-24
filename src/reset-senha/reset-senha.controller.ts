import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetSenhaService } from './reset-senha.service';
import { CreateResetSenhaDto } from './dto/create-reset-senha.dto';
import { UpdateResetSenhaDto } from './dto/update-reset-senha.dto';

@Controller('reset-senha')
export class ResetSenhaController {
  constructor(private readonly resetSenhaService: ResetSenhaService) {}

  @Post()
  async forgot(@Body() createsenhaData: CreateResetSenhaDto) {

    await this.resetSenhaService.createResetSenha(createsenhaData)

    return {message:'Sucess'}
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
