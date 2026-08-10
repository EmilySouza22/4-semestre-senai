import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
	const { usuario, sair } = useAuth();
	const navegar = useNavigate();

	async function handleSair() {
		await sair();
		navegar('/login');
	}

	return (
		<div className="flex items-center justify-between bg-white px-7 py-4 border-b border-border">
			<div className="flex items-center gap-2.5 font-semibold text-ink">
				<div className="w-8 h-8 rounded-lg bg-primary" />
				<span>Faxina Já</span>
			</div>
			<div className="flex items-center gap-4 text-sm text-muted">
				<span>Olá, {usuario?.nome}</span>
				<button
					onClick={handleSair}
					className="rounded-lg px-4 py-2 text-sm bg-white border border-primary-light text-primary-dark hover:bg-primary-light"
				>
					Sair
				</button>
			</div>
		</div>
	);
}
