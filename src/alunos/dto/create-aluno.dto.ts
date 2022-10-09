import { IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

export class CreateAlunoDto extends CreateUsuarioDto {
  @IsInt()
  semestre_pgcomp: number;

  @IsNotEmpty()
  curso: string;

  @IsUrl()
  @IsNotEmpty()
  lates_link: string;
}
