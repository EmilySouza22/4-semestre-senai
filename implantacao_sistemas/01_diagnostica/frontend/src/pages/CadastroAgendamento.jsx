import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ModalAgendamento from '../components/ModalAgendamento';
import api from '../services/api';

export default function CadastroAgendamento() {
	const [agendamentos, setAgendamentos] = useState([]);
	const [termoBusca, setTermoBusca] = useState('');
	const [modalAberto, setModalAberto] = useState(false);
	const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
	const [carregando, setCarregando] = useState(true);

	const navegar = useNavigate();

	async function carregarAgendamentos(busca = '') {
		setCarregando(true);
		const resposta = await api.get('/agendamentos', { params: { busca } });
		setAgendamentos(resposta.data);
		setCarregando(false);
	}

	useEffect(() => {
		carregarAgendamentos();
	}, []);

	function handleBuscar(evento) {
		evento.preventDefault();
		carregarAgendamentos(termoBusca);
	}

	function abrirNovo() {
		setAgendamentoSelecionado(null);
		setModalAberto(true);
	}

	function abrirEdicao(agendamento) {
		setAgendamentoSelecionado(agendamento);
		setModalAberto(true);
	}

	async function excluir(id) {
		const confirmar = window.confirm('Excluir este agendamento?');
		if (!confirmar) return;
		await api.delete(`/agendamentos/${id}`);
		carregarAgendamentos(termoBusca);
	}

	function handleSalvar() {
		setModalAberto(false);
		carregarAgendamentos(termoBusca);
	}

	return (
		<div>
			<Topbar />

			<div className="px-7 py-8">
				<button
					onClick={() => navegar('/')}
					className="text-sm text-primary-dark mb-5 hover:underline"
				>
					Voltar para a tela principal
				</button>

				<div className="flex items-center justify-between mb-5 flex-wrap gap-3">
					<h1 className="text-lg font-semibold text-ink">
						Cadastro de agendamento
					</h1>
					<button
						onClick={abrirNovo}
						className="rounded-lg px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark"
					>
						Novo agendamento
					</button>
				</div>

				<form onSubmit={handleBuscar} className="flex gap-3 mb-5 max-w-md">
					<input
						type="text"
						value={termoBusca}
						onChange={(evento) => setTermoBusca(evento.target.value)}
						placeholder="Buscar por cliente, profissional ou tipo"
						className="h-10 flex-1 rounded-lg border border-border px-3 text-sm"
					/>
					<button
						type="submit"
						className="rounded-lg px-4 py-2 text-sm border border-primary-light text-primary-dark hover:bg-primary-light"
					>
						Buscar
					</button>
				</form>

				<div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-primary-light text-primary-dark text-left">
								<th className="px-4 py-3 font-medium">Cliente</th>
								<th className="px-4 py-3 font-medium">Profissional</th>
								<th className="px-4 py-3 font-medium">Tipo</th>
								<th className="px-4 py-3 font-medium">Data</th>
								<th className="px-4 py-3 font-medium">Horário</th>
								<th className="px-4 py-3 font-medium">Status</th>
								<th className="px-4 py-3 font-medium"></th>
							</tr>
						</thead>
						<tbody>
							{!carregando && agendamentos.length === 0 && (
								<tr>
									<td colSpan={7} className="px-4 py-6 text-center text-muted">
										Nenhum agendamento encontrado.
									</td>
								</tr>
							)}
							{agendamentos.map((agendamento) => (
								<tr key={agendamento.id} className="border-t border-border">
									<td className="px-4 py-3">{agendamento.cliente_nome}</td>
									<td className="px-4 py-3">{agendamento.profissional_nome}</td>
									<td className="px-4 py-3 capitalize">
										{agendamento.tipo_servico}
									</td>
									<td className="px-4 py-3">
										{agendamento.data_servico?.slice(0, 10)}
									</td>
									<td className="px-4 py-3">
										{agendamento.horario?.slice(0, 5)}
									</td>
									<td className="px-4 py-3 capitalize">{agendamento.status}</td>
									<td className="px-4 py-3 text-right whitespace-nowrap">
										<button
											onClick={() => abrirEdicao(agendamento)}
											className="text-primary-dark hover:underline mr-4"
										>
											Editar
										</button>
										<button
											onClick={() => excluir(agendamento.id)}
											className="text-danger hover:underline"
										>
											Excluir
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{modalAberto && (
				<ModalAgendamento
					agendamento={agendamentoSelecionado}
					aoFechar={() => setModalAberto(false)}
					aoSalvar={handleSalvar}
				/>
			)}
		</div>
	);
}
