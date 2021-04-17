-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-04-2021 a las 23:52:17
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `thechamber`
--

--
-- Volcado de datos para la tabla `experience`
--

INSERT INTO `experience` (`experienceId`, `experienceName`) VALUES
(1, 'Sin experiencia'),
(2, 'Becas'),
(3, 'Menos de 5 años'),
(4, 'Más de 5 años'),
(5, 'Gestión');

--
-- Volcado de datos para la tabla `levelnames`
--

INSERT INTO `levelnames` (`idlevel`, `levelName`) VALUES
(1, 'TUTORIAL'),
(2, 'NIVEL 1'),
(3, 'NIVEL 2'),
(4, 'NIVEL 3'),
(5, 'NIVEL FINAL');

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`profileId`, `profileName`) VALUES
(1, 'Agencia digital'),
(2, 'Arquitecturas'),
(3, 'Big Data'),
(4, 'Ciberseguridad'),
(5, 'Consultoría ERP'),
(6, 'Consultoría Estratégica y de Negocio'),
(7, 'Consultoría Funcional'),
(8, 'Consultoría Tecnológica'),
(9, 'DataScience & AI'),
(10, 'Desarrollo de Software'),
(11, 'Hardware y Comunicaciones'),
(12, 'Perfiles Corporativos'),
(13, 'QA & Testing'),
(14, 'Sistemas/BBDD/Redes'),
(15, 'Soporte a Usuarios y Operación'),
(16, 'Otros');

--
-- Volcado de datos para la tabla `puzzlename`
--

INSERT INTO `puzzlename` (`idPuzzle`, `puzzleName`) VALUES
(1, 'PIPE FIXER'),
(2, 'CONSOLE SAYS'),
(3, 'HUELLAS DIGITALES 1'),
(4, 'JUEGO DEL 15 3X3'),
(5, 'HUELLAS DIGITALES 2'),
(6, 'INTELIGENCIA EMOCIONAL');

--
-- Volcado de datos para la tabla `reviewstatus`
--

INSERT INTO `reviewstatus` (`reviewStatusId`, `reviewStatusName`) VALUES
(0, 'SIN REVISAR'),
(1, 'APROBADO'),
(2, 'EN REVISION'),
(3, 'RECHAZADO'),
(4, 'DESCONOCIDO');

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rolid`, `rolName`) VALUES
(0, 'Aplicante'),
(1, 'Jugador'),
(2, 'Minsait'),
(3, 'Admin'),
(4, 'Superadmin');

--
-- Volcado de datos para la tabla `softskill`
--

INSERT INTO `softskill` (`idsoftSkill`, `softSkillName`) VALUES
(1, 'TRABAJO BAJO PRESION'),
(2, 'LOGICA'),
(3, 'RESOLUCION DE PROBLEMAS'),
(4, 'INTELIGENCIA EMOCIONAL');

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`idpruebas`, `accountId`, `timeStamp`) VALUES
(1, 7, '2021-04-16 19:42:45'),
(2, 1, '2021-04-16 21:40:55');

--
-- Volcado de datos para la tabla `account`
--

INSERT INTO `account` (`accountId`, `rolid`, `username`, `firstName`, `lastName`, `email`, `password`, `curp`, `create_time`) VALUES
(1, 4, 'grandeotos', 'Juan Luis', 'Soto Martínez', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-01 08:53:41'),
(2, 3, 'charg3r', 'Juan Luis', 'MartÃ­nez', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-01 12:53:16'),
(3, 2, 'chempox', 'Grande', 'Otos Siul', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-02 04:59:19'),
(4, 2, 'NikoBelic', 'Grande', 'Otos Siul2', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-02 04:59:38'),
(5, 3, 'Yony55', 'Grande', 'Otos Siul222', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-02 05:00:20'),
(6, 1, 'Hugo', 'Juan Luis', 'MartÃ­nez', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-03 06:00:41'),
(7, 1, 'Gamer', 'Gamer', 'tester', 'example@example.com', '78d8045d684abd2eece923758f3cd781489df3a48e1278982466017f', 'POTR420069TRONIC30', '2021-04-16 16:20:17');

--
-- Volcado de datos para la tabla `applicant`
--

INSERT INTO `applicant` (`idapplicant`, `firstName`, `lastName`, `email`, `phoneNumber`, `experienceId`, `profileId`, `reviewStatusId`) VALUES
(1, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 2, 4, 0),
(2, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 2, 4, 0),
(3, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 1, 1, 0),
(4, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 1, 1, 0),
(5, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 1, 11, 0),
(6, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', NULL, 1, 11, 0),
(7, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 1, 11, 0),
(8, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 1, 11, 0),
(9, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 1, 11, 0),
(10, 'Juan Luis', 'Martinez', 'jlusomart@gmail.com', '+5209932070342', 3, 11, 0),
(11, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 1, 1, 0),
(12, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 1, 1, 0),
(13, '', '', '', '', 1, 1, 0),
(14, 'Juan Luis', 'MartÃ­nez', 'user.luis.sm@gmail.com', '+529932070342', 4, 12, 0),
(15, 'Juan Luis', 'MartÃ­nez', 'grandeotos@gmail.com', '+529932070342', 1, 1, 0),
(16, 'Juan Luis', 'MartÃ­nez', 'grandeotos@gmail.com', '+529932070342', 1, 1, 0),
(17, 'Juan Luis', 'MartÃ­nez', 'sistema@gmail.com', '+529932070341', 1, 1, 0),
(18, 'Juan Luis', 'MartÃ­nez', 'sistema@gmail.com', '+529932070341', 1, 1, 0),
(19, 'Juan Luis', 'MartÃ­nez', 'jlusomart@gmail.com', '+5209932070342', 1, 1, 0),
(20, 'Juan Luis', 'MartÃ­nez', 'grandeotos@gmail.com', '+529932070342', 1, 1, 0),
(21, 'Juan Luis', 'MartÃ­nez', 'grandeotos@gmail.com', '+529932070342', 1, 1, 0),
(22, 'Juan Luis', 'MartÃ­nez', 'otos@gmail.com', '+529932070342', 1, 1, 0),
(23, 'Juan Luis', 'MartÃ­nez', 'sistemas@gmail.com', '+529932070342', 1, 1, 0),
(24, 'Juan Luis', 'MartÃ­nez', 'esa.luis.sm@gmail.com', '+529932070342', 1, 1, 0),
(25, 'Juan Luis', 'MartÃ­nez', 'grandecito@gmail.com', '+529932070342', 1, 1, 0),
(26, 'Juan Luis', 'MartÃ­nez', 'grandecito@gmail.com', '+529932070342', 1, 1, 0),
(27, 'Juan Luis', 'MartÃ­nez', 'sasa@gmail.com', '+5209932070342', 1, 1, 0);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
