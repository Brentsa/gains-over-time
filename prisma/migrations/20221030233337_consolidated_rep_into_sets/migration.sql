/*
  Warnings:

  - You are about to drop the `Rep` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Rep` DROP FOREIGN KEY `Rep_setId_fkey`;

-- AlterTable
ALTER TABLE `Set` ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Rep`;
