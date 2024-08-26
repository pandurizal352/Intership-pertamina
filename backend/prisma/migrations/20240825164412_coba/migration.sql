/*
  Warnings:

  - You are about to drop the column `userId` on the `perusahaan` table. All the data in the column will be lost.
  - You are about to drop the column `nama_perusahaan` on the `user` table. All the data in the column will be lost.
  - Made the column `tanggal_cek_fisik` on table `perusahaan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nomor_polisi` on table `perusahaan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `perusahaan` DROP FOREIGN KEY `Perusahaan_userId_fkey`;

-- AlterTable
ALTER TABLE `perusahaan` DROP COLUMN `userId`,
    MODIFY `tanggal_cek_fisik` VARCHAR(191) NOT NULL,
    MODIFY `nomor_polisi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `nama_perusahaan`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_perusahaanId_fkey` FOREIGN KEY (`perusahaanId`) REFERENCES `Perusahaan`(`id_perusahaan`) ON DELETE SET NULL ON UPDATE CASCADE;
