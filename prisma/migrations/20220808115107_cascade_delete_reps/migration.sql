-- DropForeignKey
ALTER TABLE `Rep` DROP FOREIGN KEY `Rep_setId_fkey`;

-- AddForeignKey
ALTER TABLE `Rep` ADD CONSTRAINT `Rep_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Set`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
