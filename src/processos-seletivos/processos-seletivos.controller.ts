import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessosSeletivosService } from './processos-seletivos.service';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';
import { ProcessoSeletivo } from '@prisma/client';

@Controller('processos-seletivos')
export class ProcessosSeletivosController {
  constructor(
    private readonly processosSeletivosService: ProcessosSeletivosService,
  ) {}

  @Post()
  create(@Body() createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return this.processosSeletivosService.create(createProcessosSeletivoDto);
  }

  //@Get()
  //findAll() {
  //  return this.processosSeletivosService.findAll();
  //}

  @Get()
  async findAllfiltrado() {
    const processos_arquivados =
      await this.processosSeletivosService.findarquivados();
    const processos_ativos = await this.processosSeletivosService.findativos();
    const result = {
      editais: {
        em_andamento: processos_ativos,
        arquivados: processos_arquivados,
      },
    };
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processosSeletivosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessosSeletivoDto: UpdateProcessosSeletivoDto,
  ) {
    return this.processosSeletivosService.update(
      +id,
      updateProcessosSeletivoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processosSeletivosService.remove(+id);
  }
}
