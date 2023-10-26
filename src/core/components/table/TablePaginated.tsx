/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type ResponsePagination, type FilterPage } from '@/shared/domain';
import { useReactTable, type ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import { type JSX } from 'react';
import PaginationLinks from './PaginationLinks';

interface TablePaginatedProps<T> {
	data: ResponsePagination<T>;
	columns: Array<ColumnDef<T, any>>;
	goToPage: (payload: FilterPage) => void;
}

const TablePaginated = <T,>({ columns, data, goToPage }: TablePaginatedProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		data: data?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Table striped bordered hover responsive>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
			{data?.data.length > 0 && <PaginationLinks data={data} goToPage={goToPage} />}
		</>
	);
};

export default TablePaginated;
