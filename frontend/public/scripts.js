document.addEventListener('DOMContentLoaded', () => {
    // Configurar navegação entre seções
    const linkListar = document.getElementById('link-listar');
    const linkAdicionar = document.getElementById('link-adicionar');
    const sectionListar = document.getElementById('section-listar');
    const sectionAdicionar = document.getElementById('section-adicionar');

    linkListar.addEventListener('click', (e) => {
        e.preventDefault();
        sectionListar.style.display = 'block';
        sectionAdicionar.style.display = 'none';
    });

    linkAdicionar.addEventListener('click', (e) => {
        e.preventDefault();
        sectionListar.style.display = 'none';
        sectionAdicionar.style.display = 'block';
    });

    // Carregar produtos na inicialização
    fetchProducts();

    // Lidar com o envio do formulário de adicionar produto
    const formAdicionar = document.getElementById('form-adicionar');
    formAdicionar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const categoria = document.getElementById('categoria').value;
        const imagem = document.getElementById('imagem').value;
        const disponivel = document.getElementById('disponivel').value === 'true';

        const newProduct = { nome, descricao, preco, categoria, imagem, disponivel };

        try {
            const response = await fetch('http://localhost:5000/api/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                formAdicionar.reset();
                fetchProducts();
            } else {
                alert('Erro ao adicionar produto.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar produto.');
        }
    });

    // Lidar com o envio do formulário de edição do produto
    const formEditar = document.getElementById('form-editar');
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const nome = document.getElementById('editNome').value;
        const descricao = document.getElementById('editDescricao').value;
        const preco = parseFloat(document.getElementById('editPreco').value);
        const categoria = document.getElementById('editCategoria').value;
        const imagem = document.getElementById('editImagem').value;
        const disponivel = document.getElementById('editDisponivel').value === 'true';

        const updatedProduct = { nome, descricao, preco, categoria, imagem, disponivel };

        try {
            const response = await fetch(`http://localhost:5000/api/produtos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                $('#editProductModal').modal('hide');
                fetchProducts();
            } else {
                alert('Erro ao atualizar produto.');
            }
        } catch (error) {
            console.error('Erro na atualização:', error);
            alert('Erro ao atualizar produto.');
        }
    });
});

// Função para buscar e exibir os produtos
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/produtos');
        const products = await response.json();
        console.log('Produtos recebidos:', products);
        const container = document.getElementById('produto-list');
        container.innerHTML = '';
        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card mb-4">
                    <img 
                        src="${product.imagem || 'https://via.placeholder.com/150'}" 
                        class="card-img-top" 
                        alt="${product.nome}"
                    >
                    <div class="card-body">
                        <h5 class="card-title">${product.nome}</h5>
                        <p class="card-text">${product.descricao}</p>
                        <p class="card-text"><strong>R$ ${parseFloat(product.preco).toFixed(2)}</strong></p>
                        <button class="btn btn-primary" onclick='openEditModal(${JSON.stringify(product)})'>
                            Editar
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para abrir o modal de edição preenchendo os campos
function openEditModal(product) {
    document.getElementById('editId').value = product.id;
    document.getElementById('editNome').value = product.nome;
    document.getElementById('editDescricao').value = product.descricao;
    document.getElementById('editPreco').value = product.preco;
    document.getElementById('editCategoria').value = product.categoria;
    document.getElementById('editImagem').value = product.imagem;
    document.getElementById('editDisponivel').value = product.disponivel ? 'true' : 'false';
    $('#editProductModal').modal('show');
}

let carrinho = [];

function adicionarAoCarrinho(produtoId) {
    // Função básica para adicionar o produto ao carrinho
    alert('Produto ' + produtoId + ' adicionado ao carrinho!');
    // Aqui, você pode incrementar uma lógica para armazenar e gerenciar o carrinho
}
