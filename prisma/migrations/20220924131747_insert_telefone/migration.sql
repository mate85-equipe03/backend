/*
  Warnings:

  - Added the required column `curso` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lattes_link` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre_pgcomp` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "curso" TEXT NOT NULL,
ADD COLUMN     "lattes_link" TEXT NOT NULL,
ADD COLUMN     "semestre_pgcomp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "telefone" TEXT NOT NULL;
