import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProcessosSeletivoDto {
  @ApiProperty({
    example: 'Edital 03/2022',
  })
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Edital aberto para edital 03/2022 para bolsas mestrado e doutorado',
  })
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    example: 'http://pgcomp.ufba.br/link_edital',
  })
  @IsNotEmpty()
  @IsUrl()
  edital_url: string;

  @ApiProperty({
    example: '2022.2',
  })
  @IsString()
  @Length(6)
  semestre: string;

//   @IsBoolean()
//   arquivado: boolean;
}
