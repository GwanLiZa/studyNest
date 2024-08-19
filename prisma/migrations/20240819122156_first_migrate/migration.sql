-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
