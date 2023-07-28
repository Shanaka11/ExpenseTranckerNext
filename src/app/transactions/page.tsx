import { getTagsService } from '@/ServerServices/ServerTagServices';
import { getTransactionsService } from '@/ServerServices/ServerTransactionServices';
import Button from '@/components/Button';
import TagFilterForm from '@/components/Forms/TagFilterForm';
import TransactionForm from '@/components/Forms/TransactionForm';
import RefreshIcon from '@/components/Icons/RefreshIcon';
import Input from '@/components/Input';
import Table, { TableColumns } from '@/components/Table/Table';
import TableAction from '@/components/Table/TableAction';
import TransactionTable from '@/components/TransactionTable';
import { Transaction } from '@/server/models/Transaction';
import React from 'react';

const page = async () => {
	// const data: Transaction[] = await getTransactionsService();

	const [transactions, tags] = await Promise.all([
		getTransactionsService(),
		getTagsService({}),
	]);

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
					? (Math.round(value * 100) / 100).toFixed(2)
					: value,
			align: 'text-right',
			columnSize: 0.6,
		},
	];

	return (
		<>
			{/* // Container */}
			<div className='grid h-full w-full grid-cols-none grid-rows-[50px_60px_1fr] items-center gap-2'>
				{/* Title */}
				<h1 className='col-span-2 text-3xl font-bold'>Transactions</h1>
				{/* Action Section */}
				<TableAction
					baseUrl='transactions'
					searchParams={{}}
					FilterDialog={TagFilterForm}
				>
					<TransactionForm title='Add' options={tags} />
				</TableAction>
				{/* // Table Container */}
				<TransactionTable transactions={transactions} tags={tags} />
			</div>
		</>
	);
};

export default page;
