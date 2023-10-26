/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { type InvestmentFilter, type InvestmentResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginateSearchInvestment from '../../application/hooks/usePaginateSearchInvestment';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';

const index = (): JSX.Element => {
	const [investmentFilter, setInvestmentFilter] = useState<RequestPagination<InvestmentFilter>>({
		page: 1,
		perPage: 10,
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
