/*
  Warnings:

  - You are about to drop the column `workoutId` on the `ExerciseTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ExerciseTemplate` DROP FOREIGN KEY `ExerciseTemplate_workoutId_fkey`;

-- AlterTable
ALTER TABLE `ExerciseTemplate` DROP COLUMN `workoutId`;

-- CreateTable
CREATE TABLE `_ExerciseTemplateToWorkout` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ExerciseTemplateToWorkout_AB_unique`(`A`, `B`),
    INDEX `_ExerciseTemplateToWorkout_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ExerciseTemplateToWorkout` ADD CONSTRAINT `_ExerciseTemplateToWorkout_A_fkey` FOREIGN KEY (`A`) REFERENCES `ExerciseTemplate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExerciseTemplateToWorkout` ADD CONSTRAINT `_ExerciseTemplateToWorkout_B_fkey` FOREIGN KEY (`B`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
