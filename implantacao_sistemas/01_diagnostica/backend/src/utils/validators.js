function validarCamposObrigatorios(campos) {
	for (const [nome, valor] of Object.entries(campos)) {
		if (valor === undefined || valor === null || valor === '') {
			return `O campo "${nome}" é obrigatório.`;
		}
	}
	return null;
}

function validarTipoServico(tipo) {
	if (!['residencial', 'comercial'].includes(tipo)) {
		return 'O tipo de serviço deve ser "residencial" ou "comercial".';
	}
	return null;
}

function validarData(data) {
	const dataInformada = new Date(data);
	if (isNaN(dataInformada.getTime())) {
		return 'Data inválida.';
	}
	return null;
}

module.exports = {
	validarCamposObrigatorios,
	validarTipoServico,
	validarData,
};
