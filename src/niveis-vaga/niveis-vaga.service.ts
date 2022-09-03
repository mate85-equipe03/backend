import { Injectable } from '@nestjs/common';
import { CreateNiveisVagaDto } from './dto/create-niveis-vaga.dto';
import { UpdateNiveisVagaDto } from './dto/update-niveis-vaga.dto';

@Injectable()
export class NiveisVagaService {
  create(createNiveisVagaDto: CreateNiveisVagaDto) {
    return 'This action adds a new niveisVaga';
  }

  findAll() {
    return `This action returns all niveisVaga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} niveisVaga`;
  }

  update(id: number, updateNiveisVagaDto: UpdateNiveisVagaDto) {
    return `This action updates a #${id} niveisVaga`;
  }

  remove(id: number) {
    return `This action removes a #${id} niveisVaga`;
  }
}
