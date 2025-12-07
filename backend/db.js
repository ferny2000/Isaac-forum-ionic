const mysql = require('mysql2/promise');

// Configuración robusta: busca la variable o usa 'railway' por defecto
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST,
  user: process.env.MYSQLUSER || process.env.MYSQL_USER,
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD,
  // 👇 AQUÍ ESTÁ EL ARREGLO MÁGICO:
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || 'railway', 
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Verificación de conexión al iniciar
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado exitosamente a la Base de Datos:', connection.config.database);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error fatal de conexión:', err.message);
  });

module.exports = pool;