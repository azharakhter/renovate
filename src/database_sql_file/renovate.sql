-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2022 at 01:22 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renovate`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_budget_info`
--

CREATE TABLE `client_budget_info` (
  `id` int(255) NOT NULL,
  `client_id` int(255) DEFAULT NULL,
  `pre_approve_amount` varchar(255) DEFAULT NULL,
  `price_range` varchar(255) DEFAULT NULL,
  `down_payment` varchar(255) DEFAULT NULL,
  `up_front_budget` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(255) DEFAULT NULL,
  `updated_by` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_budget_info`
--

INSERT INTO `client_budget_info` (`id`, `client_id`, `pre_approve_amount`, `price_range`, `down_payment`, `up_front_budget`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) VALUES
(1, 2, '2001', '2001', '2001', '2100', '2022-06-03 22:50:31', '2022-06-03 22:50:31', NULL, 2, NULL),
(2, 3, '2001', '2001', '2001', '2100', '2022-06-03 22:50:39', '2022-06-03 22:50:39', NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_info`
--

CREATE TABLE `client_info` (
  `id` int(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(255) DEFAULT NULL,
  `updated_by` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_info`
--

INSERT INTO `client_info` (`id`, `user_id`, `first_name`, `last_name`, `email`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) VALUES
(2, 2, 'test1', 'test last1', 'test@gmail.com1', '2022-06-03 22:50:31', '2022-06-03 22:50:31', NULL, 2, NULL),
(3, 2, 'test1', 'test asdalast1', 'test@gmail.codasm1', '2022-06-03 22:50:39', '2022-06-03 22:50:39', NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_property_info`
--

CREATE TABLE `client_property_info` (
  `id` int(255) NOT NULL,
  `client_id` int(255) DEFAULT NULL,
  `pro_address` varchar(255) DEFAULT NULL,
  `pro_other_address` varchar(255) DEFAULT NULL,
  `move_in_date` datetime(6) DEFAULT NULL,
  `time_frame` varchar(255) DEFAULT NULL,
  `other_dec_maker` varchar(255) DEFAULT NULL,
  `pro_type` varchar(255) DEFAULT NULL,
  `bedrooms_type` varchar(255) DEFAULT NULL,
  `pro_conditions` varchar(255) DEFAULT NULL,
  `other_question` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(255) DEFAULT NULL,
  `updated_by` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_property_info`
--

INSERT INTO `client_property_info` (`id`, `client_id`, `pro_address`, `pro_other_address`, `move_in_date`, `time_frame`, `other_dec_maker`, `pro_type`, `bedrooms_type`, `pro_conditions`, `other_question`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) VALUES
(1, 2, 'Dascoloney lahore', 'demo1 address', '2022-06-29 19:47:55.000000', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '2022-06-03 22:50:31', '2022-06-03 22:50:31', NULL, NULL, NULL),
(2, 3, 'Dascoloney lahore', 'demo1 address', '2022-06-29 19:47:55.000000', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', '2022-06-03 22:50:39', '2022-06-03 22:50:39', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(255) DEFAULT NULL,
  `updated_by` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `is_active`, `password`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) VALUES
(1, 'azhar', 'azhar@gmail.com', 1, 'test', '2022-06-30 00:47:55', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(255) NOT NULL,
  `name` int(255) DEFAULT NULL,
  `created_at` int(6) DEFAULT NULL,
  `updated_at` int(6) DEFAULT NULL,
  `deleted_at` int(6) DEFAULT NULL,
  `created_by` int(1) DEFAULT NULL,
  `updated_by` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles_assign`
--

CREATE TABLE `user_roles_assign` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `deleted_at` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_budget_info`
--
ALTER TABLE `client_budget_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_info`
--
ALTER TABLE `client_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_property_info`
--
ALTER TABLE `client_property_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles_assign`
--
ALTER TABLE `user_roles_assign`
  ADD PRIMARY KEY (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_budget_info`
--
ALTER TABLE `client_budget_info`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client_info`
--
ALTER TABLE `client_info`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `client_property_info`
--
ALTER TABLE `client_property_info`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles_assign`
--
ALTER TABLE `user_roles_assign`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
