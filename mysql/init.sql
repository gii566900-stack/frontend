CREATE DATABASE IF NOT EXISTS dept_power CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dept_power;

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(500) NOT NULL,
  body TEXT,
  voltage_tag VARCHAR(20) DEFAULT '22kV',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  photo_url VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO news (title, summary, body, voltage_tag) VALUES
('เปิดรับสมัครเข้าศึกษาต่อ ปีการศึกษา 2569', 'สาขาวิชาไฟฟ้ากำลัง เปิดรับสมัครนักศึกษาใหม่ รอบโควตาและรับตรง', 'รายละเอียดการสมัคร คุณสมบัติผู้สมัคร และกำหนดการรับสมัครสามารถติดตามได้ที่ประกาศฉบับเต็ม', '22kV'),
('อบรมเชิงปฏิบัติการ ระบบไฟฟ้าแรงสูง', 'จัดอบรมการออกแบบและบำรุงรักษาระบบสายส่งไฟฟ้าแรงสูงสำหรับนักศึกษาชั้นปีที่ 3-4', 'เนื้อหาครอบคลุมหม้อแปลงไฟฟ้ากำลัง สถานีไฟฟ้าย่อย และมาตรฐานความปลอดภัย', '115kV'),
('ทัศนศึกษาสถานีไฟฟ้าย่อย', 'นำนักศึกษาเข้าศึกษาดูงาน ณ สถานีไฟฟ้าย่อยประจำจังหวัด', 'กิจกรรมนี้เป็นส่วนหนึ่งของวิชาระบบส่งและจ่ายไฟฟ้ากำลัง', '22kV');

INSERT INTO staff (name, position, email) VALUES
('อาจารย์หัวหน้าสาขา', 'หัวหน้าสาขาวิชาไฟฟ้ากำลัง', 'head@power-dept.ac.th'),
('อาจารย์ประจำสาขา', 'อาจารย์ผู้สอนวิชาระบบไฟฟ้ากำลัง', 'lecturer1@power-dept.ac.th');
