const profissionalRepository = require('../repositories/profissionalRepository');

async function listar(req, res) {
	const profissionais = await profissionalRepository.listarTodos();
	res.json(profissionais);
}

module.exports = {
	listar,
};
