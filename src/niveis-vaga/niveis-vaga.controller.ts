import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NiveisVagaService } from './niveis-vaga.service';
import { CreateNiveisVagaDto } from './dto/create-niveis-vaga.dto';
import { UpdateNiveisVagaDto } from './dto/update-niveis-vaga.dto';

@Controller('niveis-vaga')
export class NiveisVagaController {
  constructor(private readonly niveisVagaService: NiveisVagaService) {}

  @Post()
  create(@Body() createNiveisVagaDto: CreateNiveisVagaDto) {
    return this.niveisVagaService.create(createNiveisVagaDto);
  }

  @Get()
  findAll() {
    return this.niveisVagaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveisVagaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNiveisVagaDto: UpdateNiveisVagaDto,
  ) {
    return this.niveisVagaService.update(+id, updateNiveisVagaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.niveisVagaService.remove(+id);
  }
}
