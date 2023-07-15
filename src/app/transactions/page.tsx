import Button from '@/components/Button';
import TransactionForm from '@/components/Forms/TransactionForm';
import Input from '@/components/Input';
import Table, { TableColumns } from '@/components/Table/Table';
import { auth } from '@clerk/nextjs';
import React from 'react';

type TransactionResponse = {
	id: string;
	date: string;
	description: string;
	amount: number;
	user: string;
};

const getTransactions: () => Promise<TransactionResponse[]> = async () => {
	const { getToken } = auth();
	const token = await getToken();
	const res = await fetch('http://localhost:3000/api/transaction', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error('Error');
	}
	// const test = await res.json();
	return await res.json();
};

const page = async () => {
	const data = await getTransactions();

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
				<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2'>
					{/* <Button label='Add' /> */}
					<TransactionForm title='Add' />
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
				<div className='col-span-2 mt-2 h-full w-full overflow-y-scroll rounded-lg bg-white px-4 drop-shadow-md'>
					<Table columns={columns} data={data} />
				</div>
			</div>
		</>
	);
};

export default page;
