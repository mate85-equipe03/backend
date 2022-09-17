import { Injectable } from '@nestjs/common';
import { CreateProcessosSeletivoDto } from './dto/create-processos-seletivo.dto';
import { UpdateProcessosSeletivoDto } from './dto/update-processos-seletivo.dto';

@Injectable()
export class ProcessosSeletivosService {
  create(createProcessosSeletivoDto: CreateProcessosSeletivoDto) {
    return 'This action adds a new processosSeletivo';
  }

  findAll() {
    return `This action returns all processosSeletivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processosSeletivo`;
  }

  update(id: number, updateProcessosSeletivoDto: UpdateProcessosSeletivoDto) {
    return `This action updates a #${id} processosSeletivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} processosSeletivo`;
  }
}
