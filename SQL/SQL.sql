CREATE DATABASE sms;

CREATE TABLE stock(
	product_id VARCHAR(10) NOT NULL PRIMARY KEY,
	product_category VARCHAR(20),
	product_name VARCHAR(50),
  quantity INTEGER,
  created_time DATETIME,
  mod_time DATETIME
);

CREATE TABLE record(
	record_no INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(10),
    update_date DATETIME,
    change_type VARCHAR(20),
    old_quantity INTEGER,
    new_quantity INTEGER
);

INSERT INTO `record` (`record_no`, `product_id`, `update_date`, `change_type`, `old_quantity`, `new_quantity`) VALUES
(4, 'AccGuc68', '2021-05-17 04:49:28', 'Stock Sold', 15, 10),
(5, 'AccInf63', '2021-05-17 04:49:50', 'Stock Added', 6, 9),
(6, 'cloLev68', '2021-05-17 05:19:15', 'Stock Sold', 29, 27),
(7, 'cloLev68', '2021-05-17 05:21:43', 'Stock Sold', 27, 24),
(8, 'ShoHus61', '2021-05-17 05:22:26', 'Stock Sold', 82, 18),
(9, 'AccInf63', '2021-05-17 06:08:44', 'Stock Added', 9, 11),
(10, 'AccRee62', '2021-05-19 12:46:50', 'Stock Sold', 47, 42),
(11, 'heaRol65', '2021-05-21 03:55:45', 'Stock Sold', 32, 30),
(12, 'ShoPum61', '2021-05-21 08:58:54', 'Stock Sold', 49, 46),
(13, 'JewPan67', '2021-05-21 09:00:35', 'Stock Sold', 51, 49);

INSERT INTO `stock` (`product_id`, `product_category`, `product_name`, `quantity`, `created_time`, `mod_time`) VALUES
('AccCha63', 'Accessories', 'Chanel perfume', 14, '2021-05-15 07:38:25', '2021-05-15 07:38:25'),
('AccGuc68', 'Accessories', 'Gucci bag', 10, '2021-05-15 07:10:00', '2021-05-17 04:49:28'),
('AccGue61', 'Accessories', 'Guess scarfs', 40, '2021-05-15 07:32:37', '2021-05-16 04:18:23'),
('AccInf63', 'Accessories', 'Infinity glasses', 11, '2021-05-15 07:12:40', '2021-05-17 06:08:44'),
('AccPol60', 'Accessories', 'Police glasses', 49, '2021-05-15 07:13:05', '2021-05-15 07:13:05'),
('AccRee62', 'Accessories', 'Reebok caps', 42, '2021-05-15 07:20:53', '2021-05-19 12:46:50'),
('cloAdd65', 'clothing', 'Addidas socks', 15, '2021-05-15 07:06:06', '2021-05-15 07:06:06'),
('cloBil69', 'clothing', 'Billabong Shirt', 40, '2021-05-15 07:25:33', '2021-05-15 07:25:33'),
('cloDre69', 'clothing', 'Dress', 17, '2021-05-15 06:52:47', '2021-05-15 06:52:47'),
('cloJoc68', 'clothing', 'Jockey Underwear', 10, '2021-05-15 07:04:53', '2021-05-15 07:04:53'),
('cloKap60', 'clothing', 'Kappa jacket', 11, '2021-05-15 07:03:21', '2021-05-15 07:03:21'),
('cloLac69', 'clothing', 'Lacoste tshirt', 22, '2021-05-15 06:57:26', '2021-05-15 06:57:26'),
('cloLev68', 'clothing', 'Levi jeans', 24, '2021-05-15 07:18:19', '2021-05-17 05:21:43'),
('cloTsh64', 'clothing', 'Tshirt', 25, '2021-05-15 06:53:11', '2021-05-15 06:53:11'),
('cloWoo65', 'clothing', 'Woolen jersey', 23, '2021-05-15 06:53:34', '2021-05-15 06:53:34'),
('heaFos61', 'Jewelry', 'Fossil', 17, '2021-05-15 06:55:13', '2021-05-16 04:15:18'),
('heaPol65', 'Jewelry', 'Police', 29, '2021-05-15 06:55:51', '2021-05-16 05:47:00'),
('heaRol65', 'Jewelry', 'Rolex', 30, '2021-05-15 06:51:29', '2021-05-21 03:55:45'),
('JewCat64', 'Jewelry', 'Catwalk chain', 15, '2021-05-15 07:39:24', '2021-05-15 07:39:24'),
('JewPan67', 'Jewelry', 'Pandora chain', 49, '2021-05-15 07:15:20', '2021-05-21 09:00:35'),
('ShoHus61', 'Shoes', 'Hushpuppies', 18, '2021-05-15 07:23:26', '2021-05-17 05:22:26'),
('shoNik62', 'shoes', 'Nike sandals', 12, '2021-05-15 06:54:09', '2021-05-15 06:54:09'),
('ShoPum61', 'Shoes', 'Puma sneakers', 46, '2021-05-15 07:07:19', '2021-05-21 08:58:54'),
('shoVan67', 'shoes', 'Vans', 12, '2021-05-15 06:54:47', '2021-05-16 09:06:48');
