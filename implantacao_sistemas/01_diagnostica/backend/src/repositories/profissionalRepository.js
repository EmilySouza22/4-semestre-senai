const db = require('../utils/db');

async function listarTodos() {
	const [linhas] = await db.query(
		'SELECT id, nome, disponivel FROM profissionais ORDER BY nome',
	);
	return linhas;
}

module.exports = {
	listarTodos,
};
