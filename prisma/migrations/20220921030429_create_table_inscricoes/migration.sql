-- CreateTable
CREATE TABLE "inscricoes" (
    "id" SERIAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "processo_seletivo_id" INTEGER NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "revisor_id" INTEGER NOT NULL,
    "auditor_id" INTEGER NOT NULL,
    "nota_final" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "classificacao" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscricoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses_inscricao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_revisor_id_fkey" FOREIGN KEY ("revisor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_auditor_id_fkey" FOREIGN KEY ("auditor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
