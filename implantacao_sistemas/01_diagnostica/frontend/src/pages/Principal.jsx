import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function Principal() {
	const navegar = useNavigate();

	return (
		<div>
			<Topbar />

			<div className="px-7 py-8">
				<p className="text-sm text-muted mb-5">O que você deseja fazer hoje?</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
					<div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-light">
						<div className="w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center text-xl mb-4">
							📅
						</div>
						<p className="font-medium text-ink mb-1.5">
							Cadastro de agendamento
						</p>
						<p className="text-sm text-muted leading-relaxed mb-4">
							Criar, editar, buscar e excluir agendamentos de faxina.
						</p>
						<button
							onClick={() => navegar('/agendamentos/cadastro')}
							className="rounded-lg px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark"
						>
							Abrir
						</button>
					</div>

					<div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-light">
						<div className="w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center text-xl mb-4">
							🗂️
						</div>
						<p className="font-medium text-ink mb-1.5">
							Gestão de agendamentos
						</p>
						<p className="text-sm text-muted leading-relaxed mb-4">
							Organizar horários, profissionais e verificar conflitos.
						</p>
						<button
							onClick={() => navegar('/agendamentos/gestao')}
							className="rounded-lg px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark"
						>
							Abrir
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
