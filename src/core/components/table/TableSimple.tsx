/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useReactTable, type ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';

interface TableProps<T> {
	data: T[];
	columns: Array<ColumnDef<T, any>>;
}

const TableSimple = <T,>({ columns, data }: TableProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
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
	);
};

export default TableSimple;
