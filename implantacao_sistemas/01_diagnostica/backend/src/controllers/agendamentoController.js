const agendamentoService = require('../services/agendamentoService');

async function listar(req, res) {
	const termoBusca = req.query.busca;
	const agendamentos = await agendamentoService.listar(termoBusca);
	res.json(agendamentos);
}

async function criar(req, res) {
	const resultado = await agendamentoService.criar(req.body);

	if (!resultado.sucesso) {
		return res.status(400).json({ erro: resultado.erro });
	}

	res.status(201).json({ id: resultado.id });
}

async function atualizar(req, res) {
	const { id } = req.params;
	const resultado = await agendamentoService.atualizar(id, req.body);

	if (!resultado.sucesso) {
		return res.status(400).json({ erro: resultado.erro });
	}

	res.json({ mensagem: 'Agendamento atualizado com sucesso.' });
}

async function excluir(req, res) {
	const { id } = req.params;
	await agendamentoService.excluir(id);
	res.json({ mensagem: 'Agendamento excluído com sucesso.' });
}

module.exports = {
	listar,
	criar,
	atualizar,
	excluir,
};
