/*
  Warnings:

  - You are about to drop the column `color` on the `ExerciseTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ExerciseTemplate` DROP COLUMN `color`;

-- AlterTable
ALTER TABLE `Workout` ADD COLUMN `color` VARCHAR(191) NULL;
