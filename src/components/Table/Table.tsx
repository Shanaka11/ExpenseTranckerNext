import React, { ComponentType, ReactElement } from 'react';
import TableData from './TableData';
import { TransactinFormProps } from '../Forms/TransactionForm';

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

type TableProps<T extends TableData> = {
	columns: TableColumns[];
	data?: T[];
	UpdateDialog?: ComponentType<TransactinFormProps>;
	updateDialogProps?: TransactinFormProps;
};

export type TableMatrix = {
	cells: ({
		key: any;
		label: any;
		align: 'text-left' | 'text-center' | 'text-right';
	} | null)[];
	dataItem: any;
};

// Map the data sent with the columns
const createRows = (
	columns: TableColumns[],
	data?: any[]
): TableMatrix[] | null => {
	if (data === undefined || data.length === 0) return null;
	const rows = data.map((row) => {
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
			dataItem: row,
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
const Table = <T extends TableData>({
	columns,
	data,
	UpdateDialog,
	updateDialogProps,
}: TableProps<T>) => {
	// if (data === undefined || data.length === 0) return <>No data available</>;
	const rows = createRows(columns, data);
	const columnLayout = generateColumnLayout(columns);

	return (
		<>
			{/* // Table Header */}
			<div
				className={`sticky top-0 grid border-b border-slate-300 bg-white pb-1 pt-2 text-center text-sm capitalize text-slate-600`}
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
			{rows === null ? (
				<div className='mt-2 text-center text-xs text-slate-600'>
					No Data Available
				</div>
			) : (
				<TableData<T>
					columnLayout={columnLayout}
					data={rows}
					UpdateDialog={UpdateDialog}
					updateDialogProps={updateDialogProps}
				/>
			)}
		</>
	);
};

export default Table;
