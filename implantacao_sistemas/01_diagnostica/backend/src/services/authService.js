const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuarioRepository');

async function autenticar(login, senha) {
	const usuario = await usuarioRepository.buscarPorLogin(login);

	if (!usuario) {
		return { sucesso: false, motivo: 'Usuário não encontrado.' };
	}

	const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

	if (!senhaCorreta) {
		return { sucesso: false, motivo: 'Senha incorreta.' };
	}

	return {
		sucesso: true,
		usuario: { id: usuario.id, nome: usuario.nome, login: usuario.login },
	};
}

module.exports = {
	autenticar,
};
