import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateInscricaoDto {
  @IsNotEmpty()
  url_lattes: string;

  @IsNotEmpty()
  url_enade: string;

  @IsNotEmpty()
  @IsNumberString()
  processo_seletivo_id: number;

  @IsNotEmpty()
  @IsNumberString()
  status_inscricao: number;

  @IsNotEmpty()
  @IsNumberString()
  aluno_id: number;
}
