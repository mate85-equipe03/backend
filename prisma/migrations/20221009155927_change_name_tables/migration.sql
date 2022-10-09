/*
  Warnings:

  - You are about to drop the column `nome` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "nome" TEXT NOT NULL DEFAULT 'ABC';

-- AlterTable
ALTER TABLE "professores" ADD COLUMN     "nome" TEXT NOT NULL DEFAULT 'ABC';

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nome";
