import { int } from "aws-sdk/clients/datapipeline";

export class UpdateInscricaoDto {
  url_lattes: string;
  url_enade: string;
  nota_enade: string;
  processo_seletivo_id:int;
  nota_historico_graduacao: string;
  nota_historico_posgraduacao: string;
}
