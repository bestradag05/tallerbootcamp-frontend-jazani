import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';

const Admin = (): JSX.Element => {
	return (
		<>
			<Menu />
			<Container>
				<Outlet />
			</Container>

			<div>Admin</div>
		</>
	);
};

export default Admin;
