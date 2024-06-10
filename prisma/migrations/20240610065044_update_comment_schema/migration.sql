-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_card_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "card_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
