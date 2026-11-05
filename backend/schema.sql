-- ============================================================
--  NVS International Services — MySQL schema for PHP/PDO
--  Select the target database in MySQL Workbench or phpMyAdmin first.
-- ============================================================

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

-- Tracks admin content changes and their before/after values.
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_id        INT,
  admin_username  VARCHAR(100) NOT NULL,
  action          VARCHAR(100) NOT NULL,
  changes         JSON NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_admin_audit_log_created_at (created_at)
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
