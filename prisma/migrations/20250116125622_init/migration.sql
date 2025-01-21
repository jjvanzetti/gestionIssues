-- CreateTable
CREATE TABLE `csf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(255) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `proyectoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `csf_deletedAt_denominacion_idx`(`deletedAt`, `denominacion`),
    INDEX `csf_proyectoId_fkey`(`proyectoId`),
    UNIQUE INDEX `csf_denominacion_proyectoId_key`(`denominacion`, `proyectoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(255) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Cliente_denominacion_key`(`denominacion`),
    INDEX `Cliente_deletedAt_denominacion_idx`(`deletedAt`, `denominacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `observacion` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Issues_denominacion_key`(`denominacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyecto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(255) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `clienteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Proyecto_clienteId_fkey`(`clienteId`),
    INDEX `Proyecto_deletedAt_denominacion_idx`(`deletedAt`, `denominacion`),
    UNIQUE INDEX `Proyecto_denominacion_clienteId_key`(`denominacion`, `clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuariosistema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(255) NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UsuarioSistema_denominacion_key`(`denominacion`),
    INDEX `UsuarioSistema_deletedAt_denominacion_idx`(`deletedAt`, `denominacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_proyectousuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_proyectousuario_AB_unique`(`A`, `B`),
    INDEX `_proyectousuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `csf` ADD CONSTRAINT `csf_proyectoId_fkey` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `Proyecto_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_proyectousuario` ADD CONSTRAINT `_proyectousuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `proyecto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_proyectousuario` ADD CONSTRAINT `_proyectousuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuariosistema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
