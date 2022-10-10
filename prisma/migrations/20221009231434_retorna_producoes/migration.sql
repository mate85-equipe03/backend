/*
  Warnings:

  - You are about to drop the `documentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipos_documento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_inscricao_id_fkey";

-- DropForeignKey
ALTER TABLE "documentos" DROP CONSTRAINT "documentos_tipos_documento_id_fkey";

-- DropForeignKey
ALTER TABLE "tipos_documento" DROP CONSTRAINT "tipos_documento_processo_seletivo_id_fkey";

-- DropTable
DROP TABLE "documentos";

-- DropTable
DROP TABLE "tipos_documento";

-- CreateTable
CREATE TABLE "categorias_producao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "pontuacao" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "processo_seletivo_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_producao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producoes_cientificas" (
    "id" SERIAL NOT NULL,
    "inscricao_id" INTEGER NOT NULL,
    "categorias_producao_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producoes_cientificas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categorias_producao" ADD CONSTRAINT "categorias_producao_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producoes_cientificas" ADD CONSTRAINT "producoes_cientificas_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producoes_cientificas" ADD CONSTRAINT "producoes_cientificas_categorias_producao_id_fkey" FOREIGN KEY ("categorias_producao_id") REFERENCES "categorias_producao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
