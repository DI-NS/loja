const dns = require('dns');
const { exec } = require('child_process');
require('dotenv').config();

const host = process.env.MYSQL_HOST;

console.log('Testando conexão com:', host);

// Teste de DNS
dns.lookup(host, (err, address, family) => {
  if (err) {
    console.error('Erro no DNS lookup:', err);
  } else {
    console.log('Endereço IP:', address);
    console.log('Versão IP:', family);
  }
});

// Teste de ping
exec(`ping ${host}`, (error, stdout, stderr) => {
  if (error) {
    console.error('Erro no ping:', error);
    return;
  }
  console.log('Resultado do ping:', stdout);
}); 