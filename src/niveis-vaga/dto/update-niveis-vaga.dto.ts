import { PartialType } from '@nestjs/mapped-types';
import { CreateNiveisVagaDto } from './create-niveis-vaga.dto';

export class UpdateNiveisVagaDto extends PartialType(CreateNiveisVagaDto) {}
