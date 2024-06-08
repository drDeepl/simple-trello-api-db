/*
  Warnings:

  - You are about to drop the column `cardId` on the `comments` table. All the data in the column will be lost.
  - Added the required column `card_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_cardId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "cardId",
ADD COLUMN     "card_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
