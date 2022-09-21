-- CreateTable
CREATE TABLE "etapas" (
    "id" SERIAL NOT NULL,
    "processo_seletivo_id" INTEGER NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "arquivado" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "etapas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "etapas_processo_seletivo_id_key" ON "etapas"("processo_seletivo_id");

-- AddForeignKey
ALTER TABLE "etapas" ADD CONSTRAINT "etapas_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
