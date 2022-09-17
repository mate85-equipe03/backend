-- CreateTable
CREATE TABLE "processos_seletivos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,
    "descricao" TEXT,
    "edital_url" TEXT NOT NULL,
    "arquivado" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "processos_seletivos_pkey" PRIMARY KEY ("id")
);
