import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNiveisVagaDto {
  @ApiProperty({
    example: 'Mestrado',
  })
  @IsNotEmpty()
  name: string;
}
