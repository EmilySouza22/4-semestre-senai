const clienteRepository = require('../repositories/clienteRepository');

async function listar(req, res) {
	const clientes = await clienteRepository.listarTodos();
	res.json(clientes);
}

module.exports = {
	listar,
};
