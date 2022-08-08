-- DropForeignKey
ALTER TABLE `Exercise` DROP FOREIGN KEY `Exercise_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Set` DROP FOREIGN KEY `Set_exerciseId_fkey`;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
