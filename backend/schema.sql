-- ============================================================
--  NVS International Services — database schema
--  Run this whole script once in MySQL Workbench
--  (File ▸ Open SQL Script ▸ select this file ▸ ⚡ Execute)
-- ============================================================

CREATE DATABASE IF NOT EXISTS nvs_international
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nvs_international;

-- Holds the whole editable site content as one JSON document.
-- The website merges this over its built-in defaults, exactly the
-- way it used to merge localStorage. Starts empty ({}) = show defaults.
CREATE TABLE IF NOT EXISTS site_content (
  id         INT PRIMARY KEY,
  data       JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin accounts. Passwords are stored only as bcrypt hashes.
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact-form / sponsor enquiries submitted by visitors.
CREATE TABLE IF NOT EXISTS inquiries (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(200) NOT NULL,
  phone      VARCHAR(60),
  subject    VARCHAR(255),
  message    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure the single content row exists.
INSERT INTO site_content (id, data) VALUES (1, '{}')
  ON DUPLICATE KEY UPDATE id = id;
