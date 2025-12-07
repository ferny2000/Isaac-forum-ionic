const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,         // Variable de Railway (sin guion bajo)
  user: process.env.MYSQLUSER,         // Variable de Railway (sin guion bajo)
  password: process.env.MYSQLPASSWORD, // Variable de Railway (sin guion bajo)
  database: process.env.MYSQLDATABASE, // Variable de Railway (sin guion bajo)
  port: process.env.MYSQLPORT || 3306, // Puerto de la DB (3306)
  waitForConnections: true,
  connectionLimit: 10,
});

// Mensaje opcional para confirmar conexión en consola (solo en desarrollo)
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado exitosamente a la Base de Datos de Railway');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar a la Base de Datos:', err.message);
  });

module.exports = pool;