const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');
const exigirLogin = require('../middleware/authMiddleware');

router.use(exigirLogin);
router.get('/', profissionalController.listar);

module.exports = router;
