require('dotenv').config();

module.exports = {
	porta: process.env.PORTA || 3000,
	segredoSessao: process.env.SEGREDO_SESSAO || 'segredo-provisorio',
	banco: {
		host: process.env.DB_HOST || 'localhost',
		usuario: process.env.DB_USER || 'root',
		senha: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'faxina_db',
		porta: process.env.DB_PORT || 3306,
	},
};
