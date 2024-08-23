-- CreateTable
CREATE TABLE `Pemeriksaan` (
    `id_pemeriksaan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_perusahaan` INTEGER NOT NULL,
    `id_petugas` INTEGER NOT NULL,
    `id_sopir` INTEGER NOT NULL,
    `tanggal_pemeriksaan` VARCHAR(191) NOT NULL,
    `jenis_pemeriksaan` VARCHAR(191) NOT NULL,
    `penjelasan` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pemeriksaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perusahaan` (
    `id_perusahaan` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_cek_fisik` VARCHAR(191) NOT NULL,
    `nomor_polisi` VARCHAR(191) NOT NULL,
    `nama_perusahaan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_perusahaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Petugas` (
    `id_petugas` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_petugas` VARCHAR(191) NOT NULL,
    `nama_petugas` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `Petugas_username_key`(`username`),
    PRIMARY KEY (`id_petugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sopir` (
    `id_sopir` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sopir` VARCHAR(191) NOT NULL,
    `nomer_LO` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `Sopir_username_key`(`username`),
    PRIMARY KEY (`id_sopir`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemeriksaan` ADD CONSTRAINT `Pemeriksaan_id_perusahaan_fkey` FOREIGN KEY (`id_perusahaan`) REFERENCES `Perusahaan`(`id_perusahaan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemeriksaan` ADD CONSTRAINT `Pemeriksaan_id_petugas_fkey` FOREIGN KEY (`id_petugas`) REFERENCES `Petugas`(`id_petugas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemeriksaan` ADD CONSTRAINT `Pemeriksaan_id_sopir_fkey` FOREIGN KEY (`id_sopir`) REFERENCES `Sopir`(`id_sopir`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Petugas` ADD CONSTRAINT `Petugas_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sopir` ADD CONSTRAINT `Sopir_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
