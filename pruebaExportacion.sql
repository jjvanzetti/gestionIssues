-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: gestionissues
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('5fc265f7-ee4a-45c9-8b0b-bf69ce2313c6','bbc388f6231f6c6f0952248e05c9f94d4ed7e3b4bcbe26ea091b4f0b0a370c09','2025-02-05 20:01:00.761','20250116125622_init',NULL,NULL,'2025-02-05 20:00:59.443',1),('7170be95-0024-489d-b08b-39eab64ed1a8','4d08e56035a5ad72d1e2ff185e0e45138898dc165f26d6504c3c2d076e6b8e4d','2025-02-05 20:01:01.699','20250120180527_proyecto',NULL,NULL,'2025-02-05 20:01:01.513',1),('86c037c3-0f21-402e-bbed-4bc3507c249c','3569bf807924f3387f290b6f6a0151b86e1f904feece9fdb4fa3927b45b10867','2025-02-10 13:01:22.534','20250210125656_prueba_migracion',NULL,NULL,'2025-02-10 13:01:22.435',1),('9f297323-dec3-4806-8614-59a523a8fe0f','1e5bcdaa7979497a1729b5d79986c556ac78ccbe6cedafe4f323c2617b8379ce','2025-02-05 20:01:00.948','20250116135915_init',NULL,NULL,'2025-02-05 20:01:00.769',1),('ca866510-37c1-4d98-8d8e-73fede2546ef','3e7cd493f6df08e3d3b392820e038c462c72cff8ff55d15691e6ae10827c6746','2025-02-05 20:01:01.505','20250116140011_init',NULL,NULL,'2025-02-05 20:01:00.956',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_proyectousuario`
--

DROP TABLE IF EXISTS `_proyectousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_proyectousuario` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_proyectousuario_AB_unique` (`A`,`B`),
  KEY `_proyectousuario_B_index` (`B`),
  CONSTRAINT `_proyectousuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_proyectousuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuariosistema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_proyectousuario`
--

LOCK TABLES `_proyectousuario` WRITE;
/*!40000 ALTER TABLE `_proyectousuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `_proyectousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `apellido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Desconocido',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cliente_denominacion_key` (`denominacion`),
  KEY `Cliente_deletedAt_denominacion_idx` (`deletedAt`,`denominacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'juan','2025-02-05 20:04:39.874',NULL,NULL,'Desconocido'),(2,'juana','2025-02-05 20:07:12.854',NULL,NULL,'Desconocido'),(3,'loloo','2025-02-06 20:20:52.789',NULL,NULL,'Desconocido'),(4,'fernando','2025-02-06 20:21:09.053',NULL,NULL,'Desconocido'),(5,'ferr','2025-02-06 20:25:05.822',NULL,NULL,'Desconocido');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `csf`
--

DROP TABLE IF EXISTS `csf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `csf` (
  `id` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proyectoId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `csf_denominacion_proyectoId_key` (`denominacion`,`proyectoId`),
  KEY `csf_deletedAt_denominacion_idx` (`deletedAt`,`denominacion`),
  KEY `csf_proyectoId_fkey` (`proyectoId`),
  CONSTRAINT `csf_proyectoId_fkey` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `csf`
--

LOCK TABLES `csf` WRITE;
/*!40000 ALTER TABLE `csf` DISABLE KEYS */;
/*!40000 ALTER TABLE `csf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `observacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Issues_denominacion_key` (`denominacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clienteId` int DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Proyecto_denominacion_clienteId_key` (`denominacion`,`clienteId`),
  KEY `Proyecto_clienteId_fkey` (`clienteId`),
  KEY `Proyecto_deletedAt_denominacion_idx` (`deletedAt`,`denominacion`),
  CONSTRAINT `Proyecto_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosistema`
--

DROP TABLE IF EXISTS `usuariosistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariosistema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `observacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) DEFAULT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UsuarioSistema_denominacion_key` (`denominacion`),
  KEY `UsuarioSistema_deletedAt_denominacion_idx` (`deletedAt`,`denominacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosistema`
--

LOCK TABLES `usuariosistema` WRITE;
/*!40000 ALTER TABLE `usuariosistema` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariosistema` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10 10:08:34
