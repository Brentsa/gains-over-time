/*
  Warnings:

  - You are about to drop the column `color` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `_ExerciseToMuscle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exerciseTId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ExerciseToMuscle` DROP FOREIGN KEY `_ExerciseToMuscle_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ExerciseToMuscle` DROP FOREIGN KEY `_ExerciseToMuscle_B_fkey`;

-- DropIndex
DROP INDEX `Exercise_name_key` ON `Exercise`;

-- AlterTable
ALTER TABLE `Exercise` DROP COLUMN `color`,
    DROP COLUMN `name`,
    DROP COLUMN `type`,
    ADD COLUMN `exerciseTId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_ExerciseToMuscle`;

-- CreateTable
CREATE TABLE `Workout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Workout_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountId` INTEGER NOT NULL,
    `workoutId` INTEGER NULL,
    `targetSets` INTEGER NOT NULL,
    `targetReps` INTEGER NOT NULL,
    `type` ENUM('lbs', 'seconds') NOT NULL DEFAULT 'lbs',
    `color` VARCHAR(191) NULL,

    UNIQUE INDEX `ExerciseTemplate_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ExerciseTemplateToMuscle` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ExerciseTemplateToMuscle_AB_unique`(`A`, `B`),
    INDEX `_ExerciseTemplateToMuscle_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExerciseTemplate` ADD CONSTRAINT `ExerciseTemplate_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseTemplate` ADD CONSTRAINT `ExerciseTemplate_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_exerciseTId_fkey` FOREIGN KEY (`exerciseTId`) REFERENCES `ExerciseTemplate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExerciseTemplateToMuscle` ADD CONSTRAINT `_ExerciseTemplateToMuscle_A_fkey` FOREIGN KEY (`A`) REFERENCES `ExerciseTemplate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExerciseTemplateToMuscle` ADD CONSTRAINT `_ExerciseTemplateToMuscle_B_fkey` FOREIGN KEY (`B`) REFERENCES `Muscle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
