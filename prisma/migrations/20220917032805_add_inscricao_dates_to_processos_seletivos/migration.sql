/*
  Warnings:

  - Added the required column `etapa_inscricao_fim` to the `processos_seletivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etapa_inscricao_inicio` to the `processos_seletivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "processos_seletivos" ADD COLUMN     "etapa_inscricao_fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "etapa_inscricao_inicio" TIMESTAMP(3) NOT NULL;
