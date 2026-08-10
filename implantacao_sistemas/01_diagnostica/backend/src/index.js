const express = require('express');
const cors = require('cors');
const session = require('express-session');
const env = require('./env');
const rotas = require('./routes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(
	session({
		secret: env.segredoSessao,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 4 }, // 4 horas
	}),
);

app.use('/api', rotas);

app.listen(env.porta, () => {
	console.log(`Servidor rodando na porta ${env.porta}`);
});
