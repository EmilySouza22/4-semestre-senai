const authService = require('../services/authService');

async function login(req, res) {
	const { login, senha } = req.body;

	if (!login || !senha) {
		return res.status(400).json({ erro: 'Informe login e senha.' });
	}

	const resultado = await authService.autenticar(login, senha);

	if (!resultado.sucesso) {
		return res.status(401).json({ erro: resultado.motivo });
	}

	req.session.usuario = resultado.usuario;

	return res.json({ usuario: resultado.usuario });
}

function logout(req, res) {
	req.session.destroy(() => {
		res.clearCookie('connect.sid');
		res.json({ mensagem: 'Logout realizado.' });
	});
}

function usuarioLogado(req, res) {
	if (!req.session.usuario) {
		return res.status(401).json({ erro: 'Nenhum usuário logado.' });
	}
	return res.json({ usuario: req.session.usuario });
}

module.exports = {
	login,
	logout,
	usuarioLogado,
};
