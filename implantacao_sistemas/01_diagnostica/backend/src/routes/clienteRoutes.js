const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const exigirLogin = require('../middleware/authMiddleware');

router.use(exigirLogin);
router.get('/', clienteController.listar);

module.exports = router;
