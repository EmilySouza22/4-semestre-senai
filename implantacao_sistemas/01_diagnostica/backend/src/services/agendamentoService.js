const agendamentoRepository = require('../repositories/agendamentoRepository');
const {
	validarCamposObrigatorios,
	validarTipoServico,
	validarData,
} = require('../utils/validators');

async function listar(termoBusca) {
	if (termoBusca) {
		return agendamentoRepository.buscarPorTermo(termoBusca);
	}
	return agendamentoRepository.listarTodos();
}

function validarDados(dados) {
	const erroCampos = validarCamposObrigatorios({
		cliente: dados.cliente_id,
		profissional: dados.profissional_id,
		'tipo de serviço': dados.tipo_servico,
		data: dados.data_servico,
		horário: dados.horario,
	});
	if (erroCampos) return erroCampos;

	const erroTipo = validarTipoServico(dados.tipo_servico);
	if (erroTipo) return erroTipo;

	const erroData = validarData(dados.data_servico);
	if (erroData) return erroData;

	return null;
}

async function criar(dados) {
	const erroValidacao = validarDados(dados);
	if (erroValidacao) {
		return { sucesso: false, erro: erroValidacao };
	}

	const temConflito = await agendamentoRepository.buscarConflito(
		dados.profissional_id,
		dados.data_servico,
		dados.horario,
	);

	if (temConflito) {
		return {
			sucesso: false,
			erro: 'Já existe um agendamento para este profissional nesta data e horário.',
		};
	}

	const id = await agendamentoRepository.criar(dados);
	return { sucesso: true, id };
}

async function atualizar(id, dados) {
	const erroValidacao = validarDados(dados);
	if (erroValidacao) {
		return { sucesso: false, erro: erroValidacao };
	}

	const temConflito = await agendamentoRepository.buscarConflito(
		dados.profissional_id,
		dados.data_servico,
		dados.horario,
		id,
	);

	if (temConflito) {
		return {
			sucesso: false,
			erro: 'Já existe um agendamento para este profissional nesta data e horário.',
		};
	}

	await agendamentoRepository.atualizar(id, dados);
	return { sucesso: true };
}

async function excluir(id) {
	await agendamentoRepository.excluir(id);
}

module.exports = {
	listar,
	criar,
	atualizar,
	excluir,
};
