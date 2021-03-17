-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2021 a las 23:18:08
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
-- Base de datos: `nodelogin`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES
(1, 'test', 'test', 'test@test.com'),
(2, 'test01', 'test', 'test@test.com'),
(3, 'test02', 'test', 'test@test.com'),
(4, 'test03', 'test', 'test@test.com'),
(5, 'test04', 'test', 'test@test.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gamerids`
--

CREATE TABLE `gamerids` (
  `idCandidato` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(45) NOT NULL,
  `gamerID` varchar(45) NOT NULL,
  `curp` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `gamerids`
--

INSERT INTO `gamerids` (`idCandidato`, `nombre`, `lastName`, `password`, `email`, `gamerID`, `curp`) VALUES
(1, 'name', 'lolol', 'password', 'email@email.com', 'gameroooo', 'smadofojivgjfr'),
(2, 'Juan Luis', 'Soto Martinez', 'otos', 'user.luis.sm@gmail.com', '86126', 'dick'),
(3, 'Juan Luis', 'Soto Martinez', 'aaa', 'user.luis.sm@gmail.com', '86126', 'dick'),
(4, 'Juan Luis', 'Soto Martinez', 'aaa1', 'user.luis.sm@gmail.com', '86126', 'aaaa'),
(5, 'Juan Luis', 'Soto Martinez', '1231', 'user.luis.sm@gmail.com', '86126', 'aaaa'),
(6, 'Juan Luis', 'Martínez', 'aaa', 'user.luis.sm@gmail.com', '86126', 'aaaa'),
(7, 'Juan Luisa', 'Martínez', 'aaa', 'user.luis.sm@gmail.com', '86126', 'aaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `newaplicants`
--

CREATE TABLE `newaplicants` (
  `applicantID` int(11) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `experience` varchar(45) NOT NULL,
  `profile` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `newaplicants`
--

INSERT INTO `newaplicants` (`applicantID`, `firstName`, `lastName`, `email`, `phone`, `experience`, `profile`, `status`) VALUES
(1, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'DataScience & AI', 'NOT APL'),
(2, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'DataScience & AI', 'New'),
(3, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'DataScience & AI', 'New'),
(4, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'aaa', 'New'),
(5, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'Consultoría Funcional', 'New'),
(6, 'Juan Luis', 'Martínez', 'user.luis.sm@gmail.com', '+529932070342', 'Sin experiencia', 'aaaa', 'New');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gamerids`
--
ALTER TABLE `gamerids`
  ADD PRIMARY KEY (`idCandidato`);

--
-- Indices de la tabla `newaplicants`
--
ALTER TABLE `newaplicants`
  ADD PRIMARY KEY (`applicantID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `gamerids`
--
ALTER TABLE `gamerids`
  MODIFY `idCandidato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `newaplicants`
--
ALTER TABLE `newaplicants`
  MODIFY `applicantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
