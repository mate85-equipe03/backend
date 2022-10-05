import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsUrl } from 'class-validator';

export class CreateInscricaoDto {
  @ApiProperty({
    example: 'http://lattes.cnpq.br/profile',
  })
  @IsNotEmpty()
  @IsUrl()
  url_lattes: string;

  @ApiProperty({
    example: 'http://link.enade.com/curso',
  })
  @IsNotEmpty()
  @IsUrl()
  url_enade: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  @IsNumberString()
  processo_seletivo_id: number;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  @IsNumberString()
  status_inscricao: number;

  @ApiProperty({
    example: '4',
  })
  @IsNotEmpty()
  @IsNumberString()
  aluno_id: number;
}
