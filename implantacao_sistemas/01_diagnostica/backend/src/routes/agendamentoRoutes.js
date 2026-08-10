const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const exigirLogin = require('../middleware/authMiddleware');

router.use(exigirLogin);

router.get('/', agendamentoController.listar);
router.post('/', agendamentoController.criar);
router.put('/:id', agendamentoController.atualizar);
router.delete('/:id', agendamentoController.excluir);

module.exports = router;
