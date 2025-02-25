document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/produtos')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('produto-container');
            data.forEach(produto => {
                const div = document.createElement('div');
                div.classList.add('produto-card');
                div.innerHTML = `
                    <img src="${produto.imagem || 'https://via.placeholder.com/150'}" alt="${produto.nome}" width="150">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <button onclick="adicionarAoCarrinho('${produto._id}')">Adicionar ao Carrinho</button>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
});

let carrinho = [];

function adicionarAoCarrinho(produtoId) {
    // Função básica para adicionar o produto ao carrinho
    alert('Produto ' + produtoId + ' adicionado ao carrinho!');
    // Aqui, você pode incrementar uma lógica para armazenar e gerenciar o carrinho
}
