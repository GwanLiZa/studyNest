-- CreateTable
CREATE TABLE "BookLikes" (
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookLikes_pkey" PRIMARY KEY ("bookId","userId")
);

-- CreateTable
CREATE TABLE "GenreLikes" (
    "genreId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenreLikes_pkey" PRIMARY KEY ("genreId","userId")
);

-- AddForeignKey
ALTER TABLE "BookLikes" ADD CONSTRAINT "BookLikes_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookLikes" ADD CONSTRAINT "BookLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreLikes" ADD CONSTRAINT "GenreLikes_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreLikes" ADD CONSTRAINT "GenreLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
