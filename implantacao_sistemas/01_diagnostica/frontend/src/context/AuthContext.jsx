import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [usuario, setUsuario] = useState(null);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		api
			.get('/auth/usuario-logado')
			.then((resposta) => setUsuario(resposta.data.usuario))
			.catch(() => setUsuario(null))
			.finally(() => setCarregando(false));
	}, []);

	async function entrar(login, senha) {
		const resposta = await api.post('/auth/login', { login, senha });
		setUsuario(resposta.data.usuario);
	}

	async function sair() {
		await api.post('/auth/logout');
		setUsuario(null);
	}

	return (
		<AuthContext.Provider value={{ usuario, carregando, entrar, sair }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
