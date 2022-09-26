-- CreateTable
CREATE TABLE "etapas" (
    "id" SERIAL NOT NULL,
    "processo_seletivo_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etapas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "etapas" ADD CONSTRAINT "etapas_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
