// Importando pacotes necessários
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Importa a pool de conexão com o MySQL
const pool = require('./config/db');
console.log('Conexão com MySQL inicializada.');

// Configuração do servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rota de teste básica
app.get('/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Configuração do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importa as rotas dos produtos
const productRoutes = require('./routes');
app.use('/api/produtos', productRoutes);

// Rotas referentes ao carrinho podem ser implementadas futuramente.
// Exemplo de endpoints:
// // POST /api/carrinho/adicionar - Adicionar item
// // DELETE /api/carrinho/remover/:id - Remover item
// // PUT /api/carrinho/atualizar/:id - Atualizar quantidade
// // GET /api/carrinho - Listar itens do carrinho

// Removemos os endpoints duplicados para evitar conflito com as rotas definidas em "routes.js"

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
});
