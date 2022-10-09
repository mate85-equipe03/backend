import { IsNotEmpty, IsNumberString, IsUrl } from 'class-validator';

export class CreateInscricaoDto {
  @IsNotEmpty()
  @IsUrl()
  url_enade: string;

  @IsNumberString()
  @IsNotEmpty()
  processo_seletivo_id: number;
}
