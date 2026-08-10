const db = require('../utils/db');

async function listarTodos() {
	const [linhas] = await db.query(
		'SELECT id, nome FROM clientes ORDER BY nome',
	);
	return linhas;
}

module.exports = {
	listarTodos,
};
