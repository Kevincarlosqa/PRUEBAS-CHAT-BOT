/*
  Warnings:

  - Added the required column `vector` to the `Embedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Embedding" ADD COLUMN     "vector" vector NOT NULL;
