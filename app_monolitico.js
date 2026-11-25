// meu teste
import express from 'express';
import {produtos} from './produto.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/produtos',(req,res)=>{
    res.status(200).json(produtos);
});


app.get('/produtos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (produto){
        res.status(200).json(produto);
    }else{
        res.status(404).json({mensagem: `Produto ${id} não encontrado`})
    }
});


app.get('/produtos/categoria/:cat',(req,res)=>{
    const categoria = req.params.cat;
    const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
    if (produtosFiltrados.length > 0){
        res.status(200).json(produtosFiltrados);
    }else{
        res.status(404).json({mensagem: `Nenhum produto encontrado na categoria ${categoria}`})
    }
});


app.post('/produtos',(req,res)=>{
    const {nome, preco, estoque, categoria} = req.body;
    if 
        (!nome || !preco || !estoque || !categoria){
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'});
};

const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    categoria
};


produtos.push(novoProduto);


res.status(201).json(novoProduto);
});


app.put('/produtos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {nome, preco, estoque, categoria} = req.body;


    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({mensagem: `Produto ${id} não encontrado`});
    }


    if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({mensagem: 'Todos os campos são obrigatórios'});
    }


    produtos [index]= {
        id,
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria
    };


    res.status(200).json(produtos[index]);
});


app.delete('/produtos/:id',(req,res)=>{
    const id = parseInt(req.params.id);


    const index = produtos.findIndex(p => p.id === id);


    if (index === -1) {
        return res.status(404).json({mensagem: `Produto ${id} não encontrado`});
    }


    const [produtoRemovido] = produtos.splice(index, 1);


    res.status(200).json({mensagem: `Produto ${produtoRemovido.nome} removido com sucesso`, produto: produtoRemovido});
});

app.listen(PORT,()=>{
    console.log(`Servidor roteando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/produtos para testar.`);
});