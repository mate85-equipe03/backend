-- CreateTable
CREATE TABLE "statuses_inscricao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statuses_inscricao_pkey" PRIMARY KEY ("id")
);
