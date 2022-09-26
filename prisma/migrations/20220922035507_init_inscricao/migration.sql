-- CreateTable
CREATE TABLE "categorias_producao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "pontuacao" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "processo_seletivo_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_producao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses_inscricao" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statuses_inscricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producoes_cientificas" (
    "id" SERIAL NOT NULL,
    "inscricao_id" INTEGER NOT NULL,
    "categorias_producao_id" INTEGER NOT NULL,
    "url" TEXT,
    "file" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producoes_cientificas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscricoes" (
    "id" SERIAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "processo_seletivo_id" INTEGER NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "url_lattes" TEXT,
    "url_enade" TEXT,
    "historico_graduacao" BYTEA,
    "historico_posgraduacao" BYTEA,
    "revisor_id" INTEGER,
    "auditor_id" INTEGER,
    "nota_final" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "classificacao" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inscricoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categorias_producao" ADD CONSTRAINT "categorias_producao_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producoes_cientificas" ADD CONSTRAINT "producoes_cientificas_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producoes_cientificas" ADD CONSTRAINT "producoes_cientificas_categorias_producao_id_fkey" FOREIGN KEY ("categorias_producao_id") REFERENCES "categorias_producao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses_inscricao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_processo_seletivo_id_fkey" FOREIGN KEY ("processo_seletivo_id") REFERENCES "processos_seletivos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_revisor_id_fkey" FOREIGN KEY ("revisor_id") REFERENCES "professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes" ADD CONSTRAINT "inscricoes_auditor_id_fkey" FOREIGN KEY ("auditor_id") REFERENCES "professores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
