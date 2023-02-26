-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Dez-2022 às 22:02
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dashboard_system`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_admin.online`
--

CREATE TABLE `tb_sys_admin.online` (
  `id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `ultima_acao` datetime NOT NULL,
  `token` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_sys_admin.online`
--

INSERT INTO `tb_sys_admin.online` (`id`, `ip`, `ultima_acao`, `token`) VALUES
(1, '::1', '2022-12-26 15:42:16', '63a9f636b1c25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_admin.user`
--

CREATE TABLE `tb_sys_admin.user` (
  `id` int(11) NOT NULL,
  `id_user` varchar(13) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `data_nasc` date NOT NULL,
  `login` varchar(30) NOT NULL,
  `password` varchar(33) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contato` varchar(15) NOT NULL,
  `photo_user` varchar(30) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Extraindo dados da tabela `tb_sys_admin.user`
--

INSERT INTO `tb_sys_admin.user` (`id`, `id_user`, `nome`, `data_nasc`, `login`, `password`, `email`, `contato`, `photo_user`, `status`) VALUES
(1, '5621b5a37b100', 'Valdean Souza', '2000-05-03', 'spark', '790d51b37f8c4a0bde31c1926dd4cf6c', 'mateus@gmail.com', '(92) 99296-1661', NULL, 'Ativo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sys_admin.visita`
--

CREATE TABLE `tb_sys_admin.visita` (
  `id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `dia` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_sys_admin.visita`
--

INSERT INTO `tb_sys_admin.visita` (`id`, `ip`, `dia`) VALUES
(1, '::1', '2022-12-26');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_sys_admin.online`
--
ALTER TABLE `tb_sys_admin.online`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_sys_admin.user`
--
ALTER TABLE `tb_sys_admin.user`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_sys_admin.visita`
--
ALTER TABLE `tb_sys_admin.visita`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_sys_admin.online`
--
ALTER TABLE `tb_sys_admin.online`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tb_sys_admin.visita`
--
ALTER TABLE `tb_sys_admin.visita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

--
-- Estrutura da tabela `tb_sys_site.about`
--

CREATE TABLE `tb_sys_site.inscricao` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `igreja` varchar(255) NULL,
  `data_hora` datetime NOT NULL,
  `ip` varchar(15) NOT NULL,
  `presence` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
