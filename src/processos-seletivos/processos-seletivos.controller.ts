import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessosSeletivosService } from './processos-seletivos.service';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';

@Controller('processos-seletivos')
export class ProcessosSeletivosController {
  constructor(private readonly processosSeletivosService: ProcessosSeletivosService) {}

  @Post()
  create(@Body() createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return this.processosSeletivosService.create(createProcessosSeletivoDto);
  }

  @Get()
  findAll() {
    return this.processosSeletivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processosSeletivosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessosSeletivoDto: UpdateProcessosSeletivoDto) {
    return this.processosSeletivosService.update(+id, updateProcessosSeletivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processosSeletivosService.remove(+id);
  }
}
