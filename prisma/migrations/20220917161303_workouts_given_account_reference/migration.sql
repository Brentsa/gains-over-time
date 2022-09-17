/*
  Warnings:

  - Added the required column `accountId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Workout` ADD COLUMN `accountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
