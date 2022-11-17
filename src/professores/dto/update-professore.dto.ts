import { PartialType } from '@nestjs/swagger';
import { CreateProfessoreDto } from './create-professore.dto';

export class UpdateProfessoreDto extends PartialType(CreateProfessoreDto) {
  nome: string;
  email: string;
  telefone: string;
}
