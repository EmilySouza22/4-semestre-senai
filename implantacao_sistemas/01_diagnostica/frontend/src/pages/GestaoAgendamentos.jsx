import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import ModalAgendamento from '../components/ModalAgendamento';
import api from '../services/api';
import { ordenarPorDataHorario } from '../utils/ordenar';

export default function GestaoAgendamentos() {
	const [agendamentos, setAgendamentos] = useState([]);
	const [selecionado, setSelecionado] = useState(null);
	const [modalAberto, setModalAberto] = useState(false);
	const [carregando, setCarregando] = useState(true);

	const navegar = useNavigate();

	async function carregarAgendamentos() {
		setCarregando(true);
		const resposta = await api.get('/agendamentos');
		setAgendamentos(ordenarPorDataHorario(resposta.data));
		setCarregando(false);
	}

	useEffect(() => {
		carregarAgendamentos();
	}, []);

	function selecionar(agendamento) {
		setSelecionado(agendamento);
	}

	function abrirMovimentacao() {
		if (selecionado) {
			setModalAberto(true);
		}
	}

	function handleSalvar() {
		setModalAberto(false);
		setSelecionado(null);
		carregarAgendamentos();
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
					<div>
						<h1 className="text-lg font-semibold text-ink">
							Gestão de agendamentos
						</h1>
						<p className="text-sm text-muted mt-1">
							Selecione um agendamento na lista para alterar tipo, profissional,
							data ou horário.
						</p>
					</div>
					<button
						onClick={abrirMovimentacao}
						disabled={!selecionado}
						className="rounded-lg px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark disabled:opacity-40"
					>
						Movimentar selecionado
					</button>
				</div>

				<div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="bg-primary-light text-primary-dark text-left">
								<th className="px-4 py-3 font-medium"></th>
								<th className="px-4 py-3 font-medium">Data</th>
								<th className="px-4 py-3 font-medium">Horário</th>
								<th className="px-4 py-3 font-medium">Cliente</th>
								<th className="px-4 py-3 font-medium">Profissional</th>
								<th className="px-4 py-3 font-medium">Tipo</th>
								<th className="px-4 py-3 font-medium">Status</th>
							</tr>
						</thead>
						<tbody>
							{!carregando && agendamentos.length === 0 && (
								<tr>
									<td colSpan={7} className="px-4 py-6 text-center text-muted">
										Nenhum agendamento cadastrado.
									</td>
								</tr>
							)}
							{agendamentos.map((agendamento) => (
								<tr
									key={agendamento.id}
									onClick={() => selecionar(agendamento)}
									className={`border-t border-border cursor-pointer ${
										selecionado?.id === agendamento.id
											? 'bg-primary-light'
											: 'hover:bg-bg'
									}`}
								>
									<td className="px-4 py-3">
										<input
											type="radio"
											checked={selecionado?.id === agendamento.id}
											onChange={() => selecionar(agendamento)}
										/>
									</td>
									<td className="px-4 py-3">
										{agendamento.data_servico?.slice(0, 10)}
									</td>
									<td className="px-4 py-3">
										{agendamento.horario?.slice(0, 5)}
									</td>
									<td className="px-4 py-3">{agendamento.cliente_nome}</td>
									<td className="px-4 py-3">{agendamento.profissional_nome}</td>
									<td className="px-4 py-3 capitalize">
										{agendamento.tipo_servico}
									</td>
									<td className="px-4 py-3 capitalize">{agendamento.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{modalAberto && (
				<ModalAgendamento
					agendamento={selecionado}
					aoFechar={() => setModalAberto(false)}
					aoSalvar={handleSalvar}
				/>
			)}
		</div>
	);
}
