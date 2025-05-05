/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "autor" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Embedding" (
    "id" SERIAL NOT NULL,
    "idInfo" INTEGER NOT NULL,
    "vector" vector NOT NULL,

    CONSTRAINT "Embedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoOnTopics" (
    "idInfo" INTEGER NOT NULL,
    "idTopic" INTEGER NOT NULL,

    CONSTRAINT "InfoOnTopics_pkey" PRIMARY KEY ("idInfo","idTopic")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasesOnTopics" (
    "idCase" INTEGER NOT NULL,
    "idTopic" INTEGER NOT NULL,

    CONSTRAINT "CasesOnTopics_pkey" PRIMARY KEY ("idCase","idTopic")
);

-- CreateTable
CREATE TABLE "DentalCase" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ante" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "ans" TEXT NOT NULL,

    CONSTRAINT "DentalCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_01" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_01_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_02" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_02_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_03" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_03_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_04" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_04_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_05" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_05_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_06" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_06_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_07" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_07_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_08" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_08_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_09" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_09_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_10" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_10_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_11" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_11_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_12" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_12_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_13" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_13_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_14" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_14_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Topic_15" (
    "id" BIGINT NOT NULL,
    "idStage" INTEGER NOT NULL,
    "idBook" INTEGER NOT NULL,
    "idCase" INTEGER NOT NULL,

    CONSTRAINT "Users_Topic_15_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_title_key" ON "Info"("title");

-- CreateIndex
CREATE UNIQUE INDEX "DentalCase_title_key" ON "DentalCase"("title");

-- AddForeignKey
ALTER TABLE "Embedding" ADD CONSTRAINT "Embedding_idInfo_fkey" FOREIGN KEY ("idInfo") REFERENCES "Info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfoOnTopics" ADD CONSTRAINT "InfoOnTopics_idInfo_fkey" FOREIGN KEY ("idInfo") REFERENCES "Info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfoOnTopics" ADD CONSTRAINT "InfoOnTopics_idTopic_fkey" FOREIGN KEY ("idTopic") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasesOnTopics" ADD CONSTRAINT "CasesOnTopics_idCase_fkey" FOREIGN KEY ("idCase") REFERENCES "DentalCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasesOnTopics" ADD CONSTRAINT "CasesOnTopics_idTopic_fkey" FOREIGN KEY ("idTopic") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_idCase_fkey" FOREIGN KEY ("idCase") REFERENCES "DentalCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
