CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    imagem VARCHAR(255),
    disponivel BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir alguns produtos de exemplo
INSERT INTO products (nome, descricao, preco, categoria, imagem, disponivel) VALUES
('Tênis Nike Air', 'Tênis confortável e estiloso', 299.99, 'tênis', 'https://exemplo.com/tenis.jpg', true),
('Camiseta Básica', 'Camiseta 100% algodão', 49.99, 'camisetas', 'https://exemplo.com/camiseta.jpg', true),
('Calça Jeans', 'Calça jeans tradicional', 159.99, 'calças', 'https://exemplo.com/calca.jpg', true); 