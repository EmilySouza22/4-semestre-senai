import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
	const [login, setLogin] = useState('');
	const [senha, setSenha] = useState('');
	const [erro, setErro] = useState('');
	const [enviando, setEnviando] = useState(false);

	const { entrar } = useAuth();
	const navegar = useNavigate();

	async function handleSubmit(evento) {
		evento.preventDefault();
		setErro('');
		setEnviando(true);

		try {
			await entrar(login, senha);
			navegar('/');
		} catch (erroRequisicao) {
			const mensagem =
				erroRequisicao.response?.data?.erro ||
				'Não foi possível entrar. Tente novamente.';
			setErro(mensagem);
		} finally {
			setEnviando(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-bg">
			<form
				onSubmit={handleSubmit}
				className="w-[340px] flex flex-col bg-white rounded-2xl shadow-soft border border-border px-9 py-10"
			>
				<div className="w-11 h-11 rounded-lg bg-primary mb-4" />
				<h1 className="text-xl font-semibold text-ink mb-1">Faxina Já</h1>
				<p className="text-sm text-muted mb-6">
					Entre para gerenciar os agendamentos
				</p>

				<label htmlFor="login" className="text-sm text-muted mb-1.5">
					Usuário
				</label>
				<input
					id="login"
					type="text"
					value={login}
					onChange={(evento) => setLogin(evento.target.value)}
					placeholder="Digite seu usuário"
					className="h-10 rounded-lg border border-border px-3 mb-4 text-sm focus:outline-none focus:border-primary"
				/>

				<label htmlFor="senha" className="text-sm text-muted mb-1.5">
					Senha
				</label>
				<input
					id="senha"
					type="password"
					value={senha}
					onChange={(evento) => setSenha(evento.target.value)}
					placeholder="Digite sua senha"
					className="h-10 rounded-lg border border-border px-3 mb-4 text-sm focus:outline-none focus:border-primary"
				/>

				{erro && (
					<div className="bg-danger-bg text-danger text-sm rounded-lg px-3 py-2.5 mb-4">
						{erro}
					</div>
				)}

				<button
					type="submit"
					disabled={enviando}
					className="h-11 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-70"
				>
					{enviando ? 'Entrando...' : 'Entrar'}
				</button>
			</form>
		</div>
	);
}
