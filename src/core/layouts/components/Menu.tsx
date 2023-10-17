import { type FC } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu: FC = () => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
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
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
