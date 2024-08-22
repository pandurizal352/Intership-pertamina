/*
  Warnings:

  - You are about to drop the column `password` on the `petugas` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `petugas` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `petugas` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `sopir` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `sopir` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `sopir` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `petugas` DROP FOREIGN KEY `Petugas_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `sopir` DROP FOREIGN KEY `Sopir_roleId_fkey`;

-- DropIndex
DROP INDEX `Petugas_username_key` ON `petugas`;

-- DropIndex
DROP INDEX `Sopir_username_key` ON `sopir`;

-- AlterTable
ALTER TABLE `petugas` DROP COLUMN `password`,
    DROP COLUMN `roleId`,
    DROP COLUMN `username`;

-- AlterTable
ALTER TABLE `sopir` DROP COLUMN `password`,
    DROP COLUMN `roleId`,
    DROP COLUMN `username`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
