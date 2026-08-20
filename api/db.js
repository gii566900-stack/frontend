const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "dept_user",
  password: process.env.DB_PASSWORD || "dept_pass",
  database: process.env.DB_NAME || "dept_power",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
