import React from 'react';

export type TableColumns = {
	label: string;
	accessor: string;
	formatMethod?: (value: string | number) => string;
	align?: 'text-left' | 'text-center' | 'text-right';
	columnSize?: number;
};

type TableData = {
	id: string;
};

type TableProps = {
	columns: TableColumns[];
	data: any;
};

// Map the data sent with the columns
const createRows = (columns: TableColumns[], data: any) => {
	const rows = data.map((row: any) => {
		const cells = columns.map((column) => {
			const cell = row[column.accessor];
			if (cell !== undefined) {
				if (column.formatMethod != undefined) {
					return {
						key: column.label || row.id,
						label: column.formatMethod(cell),
						align: column.align ?? 'text-left',
					};
				}
				return {
					key: column.label || row.id,
					label: cell,
					align: column.align ?? 'text-left',
				};
			}
			return null;
		});
		return {
			cells,
			id: row.id,
		};
	});
	return rows;
};

export const generateColumnLayout = (columns: TableColumns[]) => {
	let layout = '';
	columns.map((column) => {
		if (column.columnSize === undefined) {
			layout += '1fr ';
		} else if (column.columnSize < 0 && column.columnSize > 1) {
			throw new Error('Invalid column size');
		} else {
			layout += column.columnSize + 'fr ';
		}
	});
	return layout.slice(0, -1);
};

// Input Props
// Header Information, cols - { label, accessor}
// Data
const Table: React.FC<TableProps> = ({ columns, data }) => {
	const rows = createRows(columns, data);
	const columnLayout = generateColumnLayout(columns);

	return (
		<>
			{/* // Table Header */}
			<div
				className={`grid border-b border-slate-300 pb-1 text-center text-sm capitalize text-slate-600`}
				style={{ gridTemplateColumns: columnLayout }}
			>
				{columns.map((column) => (
					<div className='hover:bg-slate-200' key={column.label}>
						{column.label}
					</div>
				))}
			</div>
			{/* To Open the dialog when a row is clicked make the row a client component */}
			{/* Table Data */}
			<div className='mt-1 grid'>
				{rows.map((item: any) => (
					// Table raw
					<div
						className={`grid h-10 w-full cursor-pointer items-center justify-center
								px-1
								capitalize
								odd:bg-blue-100
								even:bg-blue-200 hover:bg-blue-400`}
						style={{ gridTemplateColumns: columnLayout }}
						key={item.id}
					>
						{item.cells.map((cell: any) => {
							return (
								<div
									className={`overflow-hidden text-ellipsis whitespace-nowrap ${cell.align}`}
									key={cell.key}
								>
									{cell.label}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</>
	);
};

export default Table;
