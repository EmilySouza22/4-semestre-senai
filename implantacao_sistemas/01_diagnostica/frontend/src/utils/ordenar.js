export function ordenarPorDataHorario(agendamentos) {
	const lista = [...agendamentos];

	for (let i = 1; i < lista.length; i++) {
		const atual = lista[i];
		let j = i - 1;

		while (j >= 0 && chaveOrdenacao(lista[j]) > chaveOrdenacao(atual)) {
			lista[j + 1] = lista[j];
			j--;
		}

		lista[j + 1] = atual;
	}

	return lista;
}

function chaveOrdenacao(agendamento) {
	return `${agendamento.data_servico}T${agendamento.horario}`;
}
