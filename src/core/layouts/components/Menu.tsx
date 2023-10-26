import { useState, type FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LocalStoragesession } from '@/core/sessions';

const Menu: FC = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const isAuth = LocalStoragesession.isValidAutorizathion();

		if (isAuth) {
			const user = LocalStoragesession.getAutorizathion();

			setUserName(`${user.name} ${user.lastName}`);
		}
	});

	const closeSession = (): void => {
		LocalStoragesession.removeAutorizathion();

		navigate('/login');
	};

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link href="#home">Inicio</Nav.Link>
						<NavDropdown title="General" id="basic-nav-dropdown">
							<NavDropdown.Item>
								<Link className="dropdown-item" to="investments">
									Inversiones
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Divider />
						</NavDropdown>
					</Nav>

					<Nav className="ms-auto">
						<NavDropdown title={`👤 ${userName}`} id="stting-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Configurar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								href="#"
								onClick={() => {
									closeSession();
								}}
							>
								Cerrar Sesión
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
