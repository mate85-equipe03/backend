import { PartialType } from '@nestjs/swagger';
import { CreateCategoriasProducaoDto } from './create-categorias-producao.dto';

export class UpdateCategoriasProducaoDto extends PartialType(CreateCategoriasProducaoDto) {}
