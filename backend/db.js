const mysql = require('mysql2/promise');

// Define la configuración basándote en si existe MYSQL_URL o no
const dbConfig = process.env.MYSQL_URL || {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.PORT || 3306 // Asegura el puerto si es local
};

const pool = mysql.createPool({
  ...((typeof dbConfig === 'string') ? { uri: dbConfig } : dbConfig), // Si es string usa uri, si es objeto lo expande
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;