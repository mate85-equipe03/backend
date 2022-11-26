import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtapasService } from './etapas.service';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';

@Controller('etapas')
export class EtapasController {
  constructor(private readonly etapasService: EtapasService) {}


  @Get()
  findAll() {
    return this.etapasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etapasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.etapasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etapasService.remove(+id);
  }
}
