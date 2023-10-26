/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginateSearchInvestment from '../../application/hooks/usePaginateSearchInvestment';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';

const index = (): JSX.Element => {
	const [investmentFilter, setInvestmentFilter] = useState<RequestPagination<InvestmentFilter>>({
		page: 1,
		perPage: 5,
	});

	const formik = useFormik<InvestmentFilter>({
		initialValues: {
			amountInvestd: '',
			description: '',
			accountantCode: '',
			year: '',
		},
		onSubmit: values => {
			console.log('values', values);

			setInvestmentFilter(prev => {
				return {
					...prev,
					filter: {
						amountInvestd: values.amountInvestd,
						description: values.description,
						accountantCode: values.accountantCode,
						year: values.year,
					},
				};
			});
		},
	});

	// React Query
	const { data: investmentPaginated, isFetching } = usePaginateSearchInvestment(investmentFilter);

	// React table
	const columnHelper = createColumnHelper<InvestmentResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('amountInvestd', {
			header: 'AMOUNTINVESTD',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('year', {
			header: 'YEAR',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('description', {
			header: 'DESCRIPTION',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('accountantCode', {
			header: 'ACCOUNTANTCODE',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('currencyTypeId', {
			header: 'CURRENCYTYPEID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('declaredTypeId', {
			header: 'DECLAREDTYPEID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('registrationDate', {
			header: 'Fech. Registro',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('state', {
			header: 'Estado',
			cell: ({ row }) => (
				<div className="text-center">
					<Badge pill bg={row.original.state ? 'success' : 'danger'}>
						{row.original.state ? 'Activo' : 'Elminado'}
					</Badge>
				</div>
			),
		}),
	];

	// Methods

	const goToPage = (payload: FilterPage): void => {
		setInvestmentFilter(prev => {
			return {
				...prev,
				page: payload.page,
				perPage: payload.perPage,
			};
		});
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card className="mb-2">
						<Card.Header>Busqueda</Card.Header>
						<Card.Body>
							<Row>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Amount Investd</Form.Label>
										<Form.Control
											type="text"
											name="amountInvestd"
											value={formik.values.amountInvestd}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Descripcion</Form.Label>
										<Form.Control
											type="text"
											name="description"
											value={formik.values.description}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6} md={4} lg={3}>
									<Form.Group>
										<Form.Label>Accountant Code</Form.Label>
										<Form.Control
											type="text"
											name="accountantCode"
											value={formik.values.accountantCode}
											onChange={formik.handleChange}
										/>
									</Form.Group>
								</Col>
							</Row>
						</Card.Body>
						<Card.Footer className="d-flex justify-content-end">
							<Button
								type="button"
								variant="primary"
								className="me-2"
								onClick={() => {
									formik.handleSubmit();
								}}
							>
								Buscar
							</Button>
							<Button type="button" variant="secondary" onClick={formik.handleReset}>
								Limpiar
							</Button>
						</Card.Footer>
					</Card>
					<Card>
						<Card.Header>Listado de inversiones</Card.Header>
						<Card.Body>
							<TablePaginated<InvestmentResponse>
								columns={columns}
								data={investmentPaginated}
								goToPage={goToPage}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
