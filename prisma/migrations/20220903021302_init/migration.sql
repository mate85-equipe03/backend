-- CreateTable
CREATE TABLE "niveis_vaga" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "niveis_vaga_pkey" PRIMARY KEY ("id")
);
