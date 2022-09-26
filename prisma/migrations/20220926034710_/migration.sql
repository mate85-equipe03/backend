/*
  Warnings:

  - You are about to drop the column `status_id` on the `inscricoes` table. All the data in the column will be lost.
  - The primary key for the `statuses_inscricao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `statuses_inscricao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusInscricao" AS ENUM ('ENVIADA', 'A_REVISAR');

-- DropForeignKey
ALTER TABLE "inscricoes" DROP CONSTRAINT "inscricoes_status_id_fkey";

-- AlterTable
ALTER TABLE "inscricoes" DROP COLUMN "status_id",
ADD COLUMN     "status" "StatusInscricao" NOT NULL DEFAULT 'ENVIADA';

-- AlterTable
ALTER TABLE "statuses_inscricao" DROP CONSTRAINT "statuses_inscricao_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" "StatusInscricao" NOT NULL,
ADD CONSTRAINT "statuses_inscricao_pkey" PRIMARY KEY ("id");
