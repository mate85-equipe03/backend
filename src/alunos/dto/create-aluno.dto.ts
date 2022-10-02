import { IsNotEmpty, IsNumber, IsNumberString, Length } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateAlunoDto extends CreateUsuarioDto {
  @IsNotEmpty()
  @Length(9)
  @IsNumberString()
  matricula: string;

  @IsNotEmpty()
  semestre_pgcomp: number;

  @IsNotEmpty()
  curso: string;

  @IsNotEmpty()
  lattes_link: string;
}
