const db = require('../utils/db');

async function listarTodos() {
	const [linhas] = await db.query(
		`SELECT a.*, c.nome AS cliente_nome, p.nome AS profissional_nome
     FROM agendamentos a
     JOIN clientes c ON c.id = a.cliente_id
     JOIN profissionais p ON p.id = a.profissional_id
     ORDER BY a.data_servico, a.horario`,
	);
	return linhas;
}

async function buscarPorTermo(termo) {
	const busca = `%${termo}%`;
	const [linhas] = await db.query(
		`SELECT a.*, c.nome AS cliente_nome, p.nome AS profissional_nome
     FROM agendamentos a
     JOIN clientes c ON c.id = a.cliente_id
     JOIN profissionais p ON p.id = a.profissional_id
     WHERE c.nome LIKE ? OR p.nome LIKE ? OR a.tipo_servico LIKE ?
     ORDER BY a.data_servico, a.horario`,
		[busca, busca, busca],
	);
	return linhas;
}

async function buscarConflito(profissionalId, data, horario, ignorarId = null) {
	let sql = `SELECT id FROM agendamentos
             WHERE profissional_id = ? AND data_servico = ? AND horario = ? AND status = 'agendado'`;
	const parametros = [profissionalId, data, horario];

	if (ignorarId) {
		sql += ' AND id != ?';
		parametros.push(ignorarId);
	}

	const [linhas] = await db.query(sql, parametros);
	return linhas.length > 0;
}

async function criar(dados) {
	const [resultado] = await db.query(
		`INSERT INTO agendamentos (cliente_id, profissional_id, tipo_servico, data_servico, horario, status)
     VALUES (?, ?, ?, ?, ?, 'agendado')`,
		[
			dados.cliente_id,
			dados.profissional_id,
			dados.tipo_servico,
			dados.data_servico,
			dados.horario,
		],
	);
	return resultado.insertId;
}

async function atualizar(id, dados) {
	await db.query(
		`UPDATE agendamentos
     SET cliente_id = ?, profissional_id = ?, tipo_servico = ?, data_servico = ?, horario = ?, status = ?
     WHERE id = ?`,
		[
			dados.cliente_id,
			dados.profissional_id,
			dados.tipo_servico,
			dados.data_servico,
			dados.horario,
			dados.status,
			id,
		],
	);
}

async function excluir(id) {
	await db.query('DELETE FROM agendamentos WHERE id = ?', [id]);
}

module.exports = {
	listarTodos,
	buscarPorTermo,
	buscarConflito,
	criar,
	atualizar,
	excluir,
};
