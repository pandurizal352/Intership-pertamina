/*
  Warnings:

  - A unique constraint covering the columns `[nama_perusahaan]` on the table `Perusahaan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_perusahaan]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama_perusahaan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `perusahaan` MODIFY `tanggal_cek_fisik` VARCHAR(191) NULL,
    MODIFY `nomor_polisi` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `nama_perusahaan` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Perusahaan_nama_perusahaan_key` ON `Perusahaan`(`nama_perusahaan`);

-- CreateIndex
CREATE UNIQUE INDEX `User_nama_perusahaan_key` ON `User`(`nama_perusahaan`);

-- AddForeignKey
ALTER TABLE `Perusahaan` ADD CONSTRAINT `Perusahaan_nama_perusahaan_fkey` FOREIGN KEY (`nama_perusahaan`) REFERENCES `User`(`nama_perusahaan`) ON DELETE RESTRICT ON UPDATE CASCADE;
