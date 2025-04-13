-- CreateTable
CREATE TABLE "Biblio" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,

    CONSTRAINT "Biblio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embedding" (
    "id" SERIAL NOT NULL,
    "biblio_id" INTEGER NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "Embedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ante" TEXT NOT NULL,
    "exam" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "case_id" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tema" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Tema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasesOnTemas" (
    "case_id" INTEGER NOT NULL,
    "tema_id" INTEGER NOT NULL,

    CONSTRAINT "CasesOnTemas_pkey" PRIMARY KEY ("case_id","tema_id")
);

-- CreateTable
CREATE TABLE "BibliosOnTemas" (
    "biblio_id" INTEGER NOT NULL,
    "tema_id" INTEGER NOT NULL,

    CONSTRAINT "BibliosOnTemas_pkey" PRIMARY KEY ("biblio_id","tema_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Biblio_title_key" ON "Biblio"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Case_title_key" ON "Case"("title");

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_biblio_id_fkey" FOREIGN KEY ("biblio_id") REFERENCES "Biblio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasesOnTemas" ADD CONSTRAINT "CasesOnTemas_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasesOnTemas" ADD CONSTRAINT "CasesOnTemas_tema_id_fkey" FOREIGN KEY ("tema_id") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibliosOnTemas" ADD CONSTRAINT "BibliosOnTemas_biblio_id_fkey" FOREIGN KEY ("biblio_id") REFERENCES "Biblio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BibliosOnTemas" ADD CONSTRAINT "BibliosOnTemas_tema_id_fkey" FOREIGN KEY ("tema_id") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
