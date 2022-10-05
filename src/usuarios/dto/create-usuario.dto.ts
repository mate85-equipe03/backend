import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: '202202003',
  })
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'aluno@ufba.br',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Entre 6 e 8 caracteres',
    example: '123456',
  })
  @IsNotEmpty()
  @Length(6, 8)
  senha: string;

  @ApiProperty({
    example: '71987546532',
  })
  @IsNotEmpty()
  @Length(11, 15)
  telefone: string;
}
