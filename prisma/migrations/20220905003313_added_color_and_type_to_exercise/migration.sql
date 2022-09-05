-- AlterTable
ALTER TABLE `Exercise` ADD COLUMN `color` VARCHAR(191) NULL DEFAULT '#FFFFFF',
    ADD COLUMN `type` ENUM('lbs', 'seconds') NOT NULL DEFAULT 'lbs';
