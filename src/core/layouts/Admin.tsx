import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

const Admin = (): JSX.Element => {
	return (
		<>
			<Sidebar />
			<div className="main">
				<PageHeader />
				<main className="content">
					<Container fluid>
						<Outlet />
					</Container>
				</main>
				<PageFooter />
			</div>
		</>
	);
};

export default Admin;
