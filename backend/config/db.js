// backend/config/db.js: Função de conexão com o MySQL utilizando mysql2.
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true  // Adiciona esta linha para converter automaticamente DECIMAL para number
}).promise();

pool.getConnection()
  .then(connection => {
    console.log('Conexão MySQL estabelecida com sucesso!');
    connection.release();
  })
  .catch(error => {
    console.error('Erro ao conectar com MySQL:', error);
    process.exit(1);
  });

module.exports = pool;
