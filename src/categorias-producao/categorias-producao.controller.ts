import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasProducaoService } from './categorias-producao.service';
import { CreateCategoriasProducaoDto } from './dto/create-categorias-producao.dto';
import { UpdateCategoriasProducaoDto } from './dto/update-categorias-producao.dto';

@Controller('categorias-producao')
export class CategoriasProducaoController {
  constructor(private readonly categoriasProducaoService: CategoriasProducaoService) {}

  @Post()
  create(@Body() createCategoriasProducaoDto: CreateCategoriasProducaoDto) {
    return this.categoriasProducaoService.create(createCategoriasProducaoDto);
  }

  @Get()
  findAll() {
    return this.categoriasProducaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasProducaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriasProducaoDto: UpdateCategoriasProducaoDto) {
    return this.categoriasProducaoService.update(+id, updateCategoriasProducaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasProducaoService.remove(+id);
  }
}
