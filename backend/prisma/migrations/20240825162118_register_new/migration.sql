/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Perusahaan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama_perusahaan` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pemeriksaan` ADD COLUMN `id_bateraiAccu` INTEGER NULL,
    ADD COLUMN `id_kabelListrik` INTEGER NULL;

-- AlterTable
ALTER TABLE `perusahaan` ADD COLUMN `userId` INTEGER NULL,
    MODIFY `tanggal_cek_fisik` VARCHAR(191) NULL,
    MODIFY `nomor_polisi` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `nama_perusahaan` VARCHAR(191) NOT NULL,
    ADD COLUMN `perusahaanId` INTEGER NULL;

-- CreateTable
CREATE TABLE `KabelListrik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semua_terisolasi` BOOLEAN NOT NULL,
    `kondisi_konduit` BOOLEAN NOT NULL,
    `perlindungan_kabel` BOOLEAN NOT NULL,
    `alat_listrik_tambahan` BOOLEAN NOT NULL,
    `pemantik_dilepas` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BateraiAccu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accuBawahtanki` BOOLEAN NOT NULL,
    `Posisiaccu` BOOLEAN NOT NULL,
    `accuIsolator` BOOLEAN NOT NULL,
    `bukanLogam` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Perusahaan_userId_key` ON `Perusahaan`(`userId`);

-- AddForeignKey
ALTER TABLE `Pemeriksaan` ADD CONSTRAINT `Pemeriksaan_id_kabelListrik_fkey` FOREIGN KEY (`id_kabelListrik`) REFERENCES `KabelListrik`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemeriksaan` ADD CONSTRAINT `Pemeriksaan_id_bateraiAccu_fkey` FOREIGN KEY (`id_bateraiAccu`) REFERENCES `BateraiAccu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perusahaan` ADD CONSTRAINT `Perusahaan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
