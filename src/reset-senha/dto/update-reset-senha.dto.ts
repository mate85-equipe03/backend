import { PartialType } from '@nestjs/swagger';
import { CreateResetSenhaDto } from './create-reset-senha.dto';

export class UpdateResetSenhaDto extends PartialType(CreateResetSenhaDto) {}
