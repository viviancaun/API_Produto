// routes/produtoRoutes.js
import { Router } from 'express';
import {
    getProdutos,
    getProdutosPorCategoria,
    getProdutoPorId,
    postProduto,
    putProduto,
    deleteProduto
} from '../controllers/produtoController.js';

const router = Router();

// O prefixo '/produtos' será definido no app.js
router.get('/', getProdutos);
router.get('/categoria/:categoria', getProdutosPorCategoria);
router.get('/:id', getProdutoPorId);
router.post('/', postProduto);
router.put('/:id', putProduto);
router.delete('/:id', deleteProduto);

export default router;
