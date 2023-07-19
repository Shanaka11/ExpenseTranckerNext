import { getTagsService } from '@/ServerServices/ServerTagServices';
import { getTransactionsService } from '@/ServerServices/ServerTransactionServices';
import Button from '@/components/Button';
import TransactionForm from '@/components/Forms/TransactionForm';
import Input from '@/components/Input';
import Table, { TableColumns } from '@/components/Table/Table';
import TransactionTable from '@/components/TransactionTable';
import { Transaction } from '@/server/models/Transaction';
import React from 'react';

const page = async () => {
	// const data: Transaction[] = await getTransactionsService();
	const [transactions, tags] = await Promise.all([
		getTransactionsService(),
		getTagsService(),
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
				<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					{/* <Button label='Add' /> */}
					<TransactionForm title='Add' options={tags} />
					{/* // Add Item Button
				// Search Box */}
					<form className='flex'>
						<Input
							label='Search Tags'
							id='Search Transactions'
							type='text'
							containermargin='m-0'
							inputsize='SMALL'
						/>
						<Button label='Search' type='submit' className='ml-1' />
					</form>
				</div>
				{/* // Table Container */}
				<TransactionTable transactions={transactions} tags={tags} />
			</div>
		</>
	);
};

export default page;
