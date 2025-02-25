// backend/controllers/ProductController.js: Controlador para operações com produtos usando MySQL.
const pool = require('../config/db');

// Função auxiliar para executar queries com retry
const executeQuery = async (query, params = []) => {
  let retries = 3;
  while (retries > 0) {
    try {
      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      retries--;
      if (retries === 0) throw error;
      console.log(`Tentativa falhou, restam ${retries} tentativas...`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // espera 1 segundo antes de tentar novamente
    }
  }
};

exports.getAll = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM products ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

exports.create = async (req, res) => {
  const { nome, descricao, preco, categoria, imagem, disponivel } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO products (nome, descricao, preco, categoria, imagem, disponivel, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
      [nome, descricao, preco, categoria, imagem, disponivel]
    );
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

exports.update = async (req, res) => {
  const { nome, descricao, preco, categoria, imagem, disponivel } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE products 
       SET nome = ?, descricao = ?, preco = ?, categoria = ?, imagem = ?, disponivel = ?, updated_at = NOW()
       WHERE id = ?`, 
      [nome, descricao, preco, categoria, imagem, disponivel, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

exports.remove = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
};
