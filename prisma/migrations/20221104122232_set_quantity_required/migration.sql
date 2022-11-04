/*
  Warnings:

  - Made the column `quantity` on table `Set` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Set` MODIFY `quantity` INTEGER NOT NULL;
