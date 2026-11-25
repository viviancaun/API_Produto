// controllers/produtoController.js
import * as ProdutoModel from '../models/produtoModel.js';

// GET /produtos
export const getProdutos = (req, res) => {
    const produtos = ProdutoModel.listarTodos();
    res.status(200).json(produtos);
};

// GET /produtos/categoria/:categoria
export const getProdutosPorCategoria = (req, res) => {
    const categoria = req.params.categoria.trim();
    const produtosCategoria = ProdutoModel.buscarPorCategoria(categoria);

    if (produtosCategoria.length > 0) {
        res.status(200).json(produtosCategoria);
    } else {
        res.status(404).json({
            mensagem: `Nenhum produto encontrado na categoria ${categoria}`
        });
    }
};

// GET /produtos/:id
export const getProdutoPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const produto = ProdutoModel.buscarPorId(id);

    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({
            mensagem: `Produto ${id} não encontrado`
        });
    }
};

// POST /produtos
export const postProduto = (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({
            mensagem: 'Todos os campos (nome, preco, estoque, categoria) são obrigatórios.'
        });
    }

    const novoProduto = ProdutoModel.criar({ nome, preco, estoque, categoria });
    res.status(201).json(novoProduto);
};

// PUT /produtos/:id
export const putProduto = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({
            mensagem: 'Todos os campos (nome, preco, estoque, categoria) devem ser informados.'
        });
    }

    const produtoAtualizado = ProdutoModel.atualizar(id, { nome, preco, estoque, categoria });

    if (!produtoAtualizado) {
        return res.status(404).json({
            mensagem: `Produto com ID ${id} não encontrado para atualização.`
        });
    }

    res.status(200).json(produtoAtualizado);
};

// DELETE /produtos/:id
export const deleteProduto = (req, res) => {
    const id = parseInt(req.params.id);
    const produtoRemovido = ProdutoModel.remover(id);

    if (!produtoRemovido) {
        return res.status(404).json({
            mensagem: `Produto com ID ${id} não encontrado para exclusão.`
        });
    }

    res.status(200).json({
        mensagem: `Produto com ID ${id} removido com sucesso.`,
        produto: produtoRemovido
    });
};
