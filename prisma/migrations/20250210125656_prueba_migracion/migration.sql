/*
  Warnings:

  - You are about to drop the column `observacion` on the `cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `observacion`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL DEFAULT 'Desconocido';
