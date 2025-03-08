-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "stage_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "case_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
