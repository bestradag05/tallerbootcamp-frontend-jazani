/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useFormik } from 'formik';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginateSearchInvestment from '../../application/hooks/usePaginateSearchInvestment';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useRemoveInvestment from '../../application/hooks/useRemoveInvestment';

const index = (): JSX.Element => {
	// Attributes

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

	const { mutateAsync } = useRemoveInvestment();
	// React table
	const columnHelper = createColumnHelper<InvestmentResponse>();

	const columns = [
		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center">Acciones</span>,
			cell: ({ row }) => (
				<span className="d-flex align-items-center justify-content-center">
					<Link className="btn btn-primary btn-sm me-2" to={`/investments/edit/${row.original.id}`}>
						✎{' '}
					</Link>
					<Button
						type="button"
						variant="danger"
						className="me-2 btn-sm"
						onClick={() => {
							void removeById(row.original);
						}}
					>
						🗑{' '}
					</Button>
				</span>
			),
		}),
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
		columnHelper.accessor('document.name', {
			header: 'DOCUMENT',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('holder.name', {
			header: 'HOLDER',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('investmentConcept.name', {
			header: 'INVESTMENT CONCEPT',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('investmentType.name', {
			header: 'INVESTMENT TYPE',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('measureUnit.name', {
			header: 'MEASURE UNIT',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('miningConcession.name', {
			header: 'MINING CONCESSION',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('periodType.name', {
			header: 'PERIOD TYPE',
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

	const removeById = async (payload: InvestmentResponse): Promise<void> => {
		const selectedOption = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		});

		if (selectedOption.isConfirmed) {
			await mutateAsync(payload.id);
		}
	};

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item>General</Breadcrumb.Item>
				<Breadcrumb.Item active>Investment</Breadcrumb.Item>
				<li className="breadcrumb-item breadcrumb-action ms-auto">
					<Link className="btn btn-success" to="/investments/create">
						Nuevo
					</Link>
				</li>
			</Breadcrumb>
			<Row>
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
