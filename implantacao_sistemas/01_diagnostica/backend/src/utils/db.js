const pool = mysql.createPool({
	host: env.banco.host,
	user: env.banco.usuario,
	password: env.banco.senha,
	database: env.banco.database,
	port: env.banco.porta,
	waitForConnections: true,
	connectionLimit: 10,
});

module.exports = pool;
