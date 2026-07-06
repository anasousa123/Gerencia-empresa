// Pegar produtos do localStorage
function getProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

// Salvar produtos no localStorage
function saveProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const preco = document.getElementById("precoProduto").value;
    const descricao = document.getElementById("descricaoProduto").value;

    if (!nome || !preco || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const produtos = getProdutos();

    const novoProduto = {
        id: Date.now(),
        nome: nome,
        preco: preco,
        descricao: descricao
    };

    produtos.push(novoProduto);
    saveProdutos(produtos);

    limparCampos();
    listarProdutos();
}

// Limpar formulário
function limparCampos() {
    document.getElementById("nomeProduto").value = "";
    document.getElementById("precoProduto").value = "";
    document.getElementById("descricaoProduto").value = "";
}
// Listar produtos na tela
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const produtos = getProdutos();

    lista.innerHTML = "";

    produtos.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("produto-card");

        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Preço: R$ ${produto.preco}</p>
            <p>${produto.descricao}</p>

            <button class="edit" onclick="editarProduto(${produto.id})">Editar</button>
            <button class="delete" onclick="removerProduto(${produto.id})">Remover</button>
        `;

        lista.appendChild(card);
    });
}
// Remover produto
function removerProduto(id) {
    let produtos = getProdutos();

    produtos = produtos.filter(p => p.id !== id);

    saveProdutos(produtos);
    listarProdutos();
}

// Editar produto
function editarProduto(id) {
    const produtos = getProdutos();

    const produto = produtos.find(p => p.id === id);

    if (produto) {
        const novoNome = prompt("Novo nome:", produto.nome);
        const novoPreco = prompt("Novo preço:", produto.preco);
        const novaDescricao = prompt("Nova descrição:", produto.descricao);

        if (novoNome && novoPreco && novaDescricao) {
            produto.nome = novoNome;
            produto.preco = novoPreco;
            produto.descricao = novaDescricao;

            saveProdutos(produtos);
            listarProdutos();
        }
    }
}

// Inicializar ao abrir página
document.addEventListener("DOMContentLoaded", listarProdutos);