/*
  Warnings:

  - A unique constraint covering the columns `[userId,themeId]` on the table `Step` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[botIndex]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vector` to the `Embedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `botIndex` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Embedding" ADD COLUMN     "vector" vector NOT NULL;

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "botIndex" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Step_userId_themeId_key" ON "Step"("userId", "themeId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_botIndex_key" ON "Theme"("botIndex");
