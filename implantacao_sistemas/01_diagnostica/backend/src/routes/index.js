const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const agendamentoRoutes = require('./agendamentoRoutes');
const clienteRoutes = require('./clienteRoutes');
const profissionalRoutes = require('./profissionalRoutes');

router.use('/auth', authRoutes);
router.use('/agendamentos', agendamentoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/profissionais', profissionalRoutes);

module.exports = router;
