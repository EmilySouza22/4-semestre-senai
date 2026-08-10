const db = require('../utils/db');

async function buscarPorLogin(login) {
	const [linhas] = await db.query(
		'SELECT * FROM usuarios WHERE login = ? LIMIT 1',
		[login],
	);
	return linhas[0] || null;
}

module.exports = {
	buscarPorLogin,
};
