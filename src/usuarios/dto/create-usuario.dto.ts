import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 8)
  senha: string;

  @IsNotEmpty()
  @Length(11, 15)
  telefone: string;
}
