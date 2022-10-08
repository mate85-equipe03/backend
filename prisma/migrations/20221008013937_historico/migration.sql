-- CreateEnum
CREATE TYPE "TipoHistorico" AS ENUM ('GRADUACAO', 'POS_GRADUACAO');

-- CreateTable
CREATE TABLE "historicos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" "TipoHistorico" NOT NULL,
    "inscricao_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historicos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
