import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import Login from './pages/Login';
import Principal from './pages/Principal';
import CadastroAgendamento from './pages/CadastroAgendamento';
import GestaoAgendamentos from './pages/GestaoAgendamentos';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<RotaProtegida>
							<Principal />
						</RotaProtegida>
					}
				/>
				<Route
					path="/agendamentos/cadastro"
					element={
						<RotaProtegida>
							<CadastroAgendamento />
						</RotaProtegida>
					}
				/>
				<Route
					path="/agendamentos/gestao"
					element={
						<RotaProtegida>
							<GestaoAgendamentos />
						</RotaProtegida>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
