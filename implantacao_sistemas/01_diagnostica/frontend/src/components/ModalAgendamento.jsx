import { useEffect, useState } from 'react';
import api from '../services/api';

const valoresIniciais = {
	cliente_id: '',
	profissional_id: '',
	tipo_servico: 'residencial',
	data_servico: '',
	horario: '',
	status: 'agendado',
};

export default function ModalAgendamento({ agendamento, aoFechar, aoSalvar }) {
	const [clientes, setClientes] = useState([]);
	const [profissionais, setProfissionais] = useState([]);
	const [dados, setDados] = useState(valoresIniciais);
	const [erro, setErro] = useState('');
	const [salvando, setSalvando] = useState(false);

	useEffect(() => {
		api.get('/clientes').then((resposta) => setClientes(resposta.data));
		api
			.get('/profissionais')
			.then((resposta) => setProfissionais(resposta.data));
	}, []);

	useEffect(() => {
		if (agendamento) {
			setDados({
				cliente_id: agendamento.cliente_id,
				profissional_id: agendamento.profissional_id,
				tipo_servico: agendamento.tipo_servico,
				data_servico: agendamento.data_servico?.slice(0, 10) || '',
				horario: agendamento.horario?.slice(0, 5) || '',
				status: agendamento.status,
			});
		}
	}, [agendamento]);

	function atualizarCampo(campo, valor) {
		setDados((atual) => ({ ...atual, [campo]: valor }));
	}

	async function handleSubmit(evento) {
		evento.preventDefault();
		setErro('');
		setSalvando(true);

		try {
			if (agendamento) {
				await api.put(`/agendamentos/${agendamento.id}`, dados);
			} else {
				await api.post('/agendamentos', dados);
			}
			aoSalvar();
		} catch (erroRequisicao) {
			const mensagem =
				erroRequisicao.response?.data?.erro ||
				'Não foi possível salvar o agendamento.';
			setErro(mensagem);
		} finally {
			setSalvando(false);
		}
	}

	return (
		<div className="fixed inset-0 bg-ink/40 flex items-center justify-center px-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white rounded-2xl shadow-soft p-7 flex flex-col gap-4"
			>
				<h2 className="text-lg font-semibold text-ink">
					{agendamento ? 'Editar agendamento' : 'Novo agendamento'}
				</h2>

				<div className="flex flex-col gap-1.5">
					<label className="text-sm text-muted">Cliente</label>
					<select
						value={dados.cliente_id}
						onChange={(evento) =>
							atualizarCampo('cliente_id', evento.target.value)
						}
						className="h-10 rounded-lg border border-border px-3 text-sm"
					>
						<option value="">Selecione um cliente</option>
						{clientes.map((cliente) => (
							<option key={cliente.id} value={cliente.id}>
								{cliente.nome}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="text-sm text-muted">Profissional</label>
					<select
						value={dados.profissional_id}
						onChange={(evento) =>
							atualizarCampo('profissional_id', evento.target.value)
						}
						className="h-10 rounded-lg border border-border px-3 text-sm"
					>
						<option value="">Selecione um profissional</option>
						{profissionais.map((profissional) => (
							<option key={profissional.id} value={profissional.id}>
								{profissional.nome}{' '}
								{!profissional.disponivel && '(indisponível)'}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-1.5">
					<label className="text-sm text-muted">Tipo de serviço</label>
					<select
						value={dados.tipo_servico}
						onChange={(evento) =>
							atualizarCampo('tipo_servico', evento.target.value)
						}
						className="h-10 rounded-lg border border-border px-3 text-sm"
					>
						<option value="residencial">Residencial</option>
						<option value="comercial">Comercial</option>
					</select>
				</div>

				<div className="flex gap-3">
					<div className="flex flex-col gap-1.5 flex-1">
						<label className="text-sm text-muted">Data</label>
						<input
							type="date"
							value={dados.data_servico}
							onChange={(evento) =>
								atualizarCampo('data_servico', evento.target.value)
							}
							className="h-10 rounded-lg border border-border px-3 text-sm"
						/>
					</div>
					<div className="flex flex-col gap-1.5 flex-1">
						<label className="text-sm text-muted">Horário</label>
						<input
							type="time"
							value={dados.horario}
							onChange={(evento) =>
								atualizarCampo('horario', evento.target.value)
							}
							className="h-10 rounded-lg border border-border px-3 text-sm"
						/>
					</div>
				</div>

				{agendamento && (
					<div className="flex flex-col gap-1.5">
						<label className="text-sm text-muted">Status</label>
						<select
							value={dados.status}
							onChange={(evento) =>
								atualizarCampo('status', evento.target.value)
							}
							className="h-10 rounded-lg border border-border px-3 text-sm"
						>
							<option value="agendado">Agendado</option>
							<option value="concluido">Concluído</option>
							<option value="cancelado">Cancelado</option>
						</select>
					</div>
				)}

				{erro && (
					<div className="bg-danger-bg text-danger text-sm rounded-lg px-3 py-2.5">
						{erro}
					</div>
				)}

				<div className="flex justify-end gap-3 mt-2">
					<button
						type="button"
						onClick={aoFechar}
						className="rounded-lg px-4 py-2 text-sm border border-border text-muted hover:bg-bg"
					>
						Cancelar
					</button>
					<button
						type="submit"
						disabled={salvando}
						className="rounded-lg px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark disabled:opacity-70"
					>
						{salvando ? 'Salvando...' : 'Salvar'}
					</button>
				</div>
			</form>
		</div>
	);
}
