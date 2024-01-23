/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" VARCHAR(50) NOT NULL,
ADD COLUMN     "friends" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "impressions" INTEGER,
ADD COLUMN     "lastName" VARCHAR(50) NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "picturePath" TEXT DEFAULT '',
ADD COLUMN     "viewedProfile" INTEGER,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "location" TEXT,
    "description" TEXT,
    "picturePath" TEXT,
    "userPicturePath" TEXT,
    "likes" JSONB NOT NULL,
    "friends" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
