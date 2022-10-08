/*
  Warnings:

  - You are about to drop the column `historico_graduacao` on the `inscricoes` table. All the data in the column will be lost.
  - You are about to drop the column `historico_posgraduacao` on the `inscricoes` table. All the data in the column will be lost.
  - You are about to drop the `categorias_producao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `producoes_cientificas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categorias_producao" DROP CONSTRAINT "categorias_producao_processo_seletivo_id_fkey";

-- DropForeignKey
ALTER TABLE "producoes_cientificas" DROP CONSTRAINT "producoes_cientificas_categorias_producao_id_fkey";

-- DropForeignKey
ALTER TABLE "producoes_cientificas" DROP CONSTRAINT "producoes_cientificas_inscricao_id_fkey";

-- AlterTable
ALTER TABLE "inscricoes" DROP COLUMN "historico_graduacao",
DROP COLUMN "historico_posgraduacao";

-- DropTable
DROP TABLE "categorias_producao";

-- DropTable
DROP TABLE "producoes_cientificas";

-- CreateTable
CREATE TABLE "tipos_documento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "pontuacao" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "processo_seletivo_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipos_documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" SERIAL NOT NULL,
    "inscricao_id" INTEGER NOT NULL,
    "tipos_documento_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tipos_documento" ADD CONSTRAINT "tipos_documento_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_tipos_documento_id_fkey" FOREIGN KEY ("tipos_documento_id") REFERENCES "tipos_documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
