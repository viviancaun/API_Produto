// models/produtoModel.js

// Base de dados em memória (antes ficava em produtos.js)
const produtos = [
    { id: 1, nome: 'Notebook', preco: 3500.00, estoque: 10, categoria: 'Informatica' },
    { id: 2, nome: 'Mouse Gamer', preco: 150.00, estoque: 50, categoria: 'Informatica' },
    { id: 3, nome: 'Teclado Mecânico', preco: 450.00, estoque: 30, categoria: 'Informatica' }
];

// Retorna todos os produtos
export const listarTodos = () => {
    return produtos;
};

// Filtra produtos por categoria
export const buscarPorCategoria = (categoria) => {
    return produtos.filter(
        p => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
};

// Busca um único produto pelo ID
export const buscarPorId = (id) => {
    return produtos.find(p => p.id === id);
};

// Cria e insere um novo produto no array
export const criar = ({ nome, preco, estoque, categoria }) => {
    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria
    };

    produtos.push(novoProduto);
    return novoProduto;
};

// Atualiza um produto existente pelo ID
export const atualizar = (id, { nome, preco, estoque, categoria }) => {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;

    produtos[index] = {
        id,
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria
    };

    return produtos[index];
};

// Remove um produto pelo ID e retorna o item excluído
export const remover = (id) => {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;

    const [produtoRemovido] = produtos.splice(index, 1);
    return produtoRemovido;
};
