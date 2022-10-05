import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, Length } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateAlunoDto extends CreateUsuarioDto {
  @ApiProperty({
    example: '202202003',
  })
  @IsNotEmpty()
  @Length(9)
  @IsNumberString()
  matricula: string;

  @ApiProperty({
    example: '20221',
  })
  @IsNumberString()
  @IsNotEmpty()
  semestre_pgcomp: number;

  @ApiProperty({
    example: 'mestrado',
  })
  @IsNotEmpty()
  curso: string;

  @ApiProperty({
    example: 'http://lattes.cnpq.br/profile',
  })
  @IsNotEmpty()
  lattes_link: string;
}
