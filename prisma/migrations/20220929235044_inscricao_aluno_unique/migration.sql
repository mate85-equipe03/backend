/*
  Warnings:

  - A unique constraint covering the columns `[aluno_id]` on the table `inscricoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "inscricoes_aluno_id_key" ON "inscricoes"("aluno_id");
