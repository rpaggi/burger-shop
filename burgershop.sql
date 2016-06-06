-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.14-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para burgershop
CREATE DATABASE IF NOT EXISTS `burgershop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `burgershop`;


-- Copiando estrutura para tabela burgershop.logins
CREATE TABLE IF NOT EXISTS `logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `user` varchar(25) NOT NULL,
  `password` varchar(40) NOT NULL,
  `profile` int(11) NOT NULL,
  `token` varchar(50) DEFAULT NULL,
  `hincl` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNI` (`user`),
  KEY `INDEX1` (`id`),
  KEY `FK_logins_profiles` (`profile`),
  CONSTRAINT `FK_logins_profiles` FOREIGN KEY (`profile`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela burgershop.logins: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
REPLACE INTO `logins` (`id`, `name`, `user`, `password`, `profile`, `token`, `hincl`) VALUES
	(1, 'Administrador', 'admin', '0', 1, NULL, '2016-06-06 12:13:54');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;


-- Copiando estrutura para tabela burgershop.profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNI` (`id`),
  KEY `INDEX1` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela burgershop.profiles: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
REPLACE INTO `profiles` (`id`, `name`) VALUES
	(1, 'Master'),
  (2, 'Administrador'),
  (3, 'Balcão'),
  (4, 'Atendimento');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
