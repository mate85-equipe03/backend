import { PartialType } from '@nestjs/swagger';
import { CreateProcessosSeletivoDto } from './create-processos-seletivo.dto';

export class UpdateProcessosSeletivoDto extends PartialType(CreateProcessosSeletivoDto) {}
