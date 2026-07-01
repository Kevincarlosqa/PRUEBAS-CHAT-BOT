/*
  Warnings:

  - Added the required column `caption` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "toothNumber" TEXT;

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "selectedTooth" TEXT;

-- CreateTable
CREATE TABLE "CaseTooth" (
    "id" SERIAL NOT NULL,
    "caseId" INTEGER NOT NULL,
    "toothNumber" TEXT NOT NULL,
    "clinicalExam" TEXT NOT NULL,
    "radiographicNotes" TEXT NOT NULL,
    "radiographicDepth" TEXT NOT NULL,
    "rootResorption" TEXT NOT NULL,
    "correctDiagnosis" TEXT NOT NULL,
    "detailSummary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseTooth_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CaseTooth" ADD CONSTRAINT "CaseTooth_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
