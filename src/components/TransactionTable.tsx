import { Transaction } from '@prisma/client';
import React from 'react';
import TransactionForm from './Forms/TransactionForm';
import Table, { TableColumns } from './Table/Table';

type TransactionTableProps = {
	transactions: any;
	tags: any;
	readonly?: boolean;
	width?: string;
};

const TransactionTable: React.FC<TransactionTableProps> = ({
	transactions,
	tags,
	readonly = false,
	width,
}) => {
	const columns: TableColumns[] = [
		{
			label: 'Date',
			accessor: 'date',
			formatMethod: (value) => new Date(value).toLocaleDateString('en-US'),
			columnSize: 0.5,
		},
		{
			label: 'Description',
			accessor: 'description',
		},
		{
			label: 'Transaction Amount',
			accessor: 'amount',

			formatMethod: (value) =>
				typeof value === 'number'
					? (Math.round(value * 100) / 100).toLocaleString(undefined, {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
					  })
					: value,
			align: 'text-right',
			columnSize: 0.6,
		},
	];
	return (
		<>
			<div
				className={
					width ??
					'col-span-2' +
						' mt-2 h-full w-full overflow-y-scroll rounded-lg bg-white px-4 drop-shadow-md'
				}
			>
				<Table<Transaction>
					columns={columns}
					data={transactions}
					UpdateDialog={readonly ? undefined : TransactionForm}
					updateDialogProps={
						readonly ? undefined : { options: tags, hideicon: true }
					}
				/>
			</div>
		</>
	);
};

export default TransactionTable;
