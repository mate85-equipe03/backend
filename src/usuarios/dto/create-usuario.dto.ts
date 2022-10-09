import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 9)
  login: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNumberString()
  @Length(11)
  telefone: string;
}
