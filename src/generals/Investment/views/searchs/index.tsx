import { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import { InvestmentRepository } from '../../Infraestructure';
import { type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';

const index = (): JSX.Element => {
	const [investments, invermentSet] = useState<InvestmentResponse[]>([]);

	useEffect(() => {
		void loadInvestment();
	}, []);

	const loadInvestment = async (): Promise<void> => {
		const response = await InvestmentRepository.findAll();

		invermentSet(response);
		console.log('Response ', response);
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de inversiones</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>ID</th>
										<th>Monto</th>
										<th>Año</th>
										<th>Descripcion</th>
										<th>Documento</th>
										<th>Poseedor</th>
										<th>Concepto Inversion</th>
										<th>Tipo Inversion</th>
										<th>Unidad Medida</th>
										<th>Concesion</th>
										<th>Tipo Periodo</th>
										<th>state</th>
									</tr>
								</thead>
								<tbody>
									{investments.length > 0 &&
										investments.map(investment => (
											<tr key={investment.id}>
												<td>{investment.id}</td>
												<td>{investment.amountInvestd}</td>
												<td>{investment.year}</td>
												<td>{investment.description}</td>
												<td>{investment.document != null ? investment.document.name : ''}</td>
												<td>{investment.holder != null ? investment.holder.name : ''}</td>
												<td>
													{investment.investmentConcept != null
														? investment.investmentConcept.name
														: ''}
												</td>
												<td>
													{investment.investmentType != null ? investment.investmentType.name : ''}
												</td>
												<td>{investment.measureUnit != null ? investment.measureUnit.name : ''}</td>
												<td>
													{investment.minigConcession != null
														? investment.minigConcession.name
														: ''}
												</td>
												<td>{investment.periodType != null ? investment.periodType.name : ''}</td>
												<td>
													<Badge pill bg={investment.state ? 'success' : 'danger'}>
														{investment.state ? 'Activo' : 'Inhabilitado'}
													</Badge>
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
