// backend/models/Product.js: Modelo do Produto para o MongoDB.
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    imagem: { type: String },
    disponivel: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
