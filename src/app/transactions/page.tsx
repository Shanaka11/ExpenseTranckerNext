import Button from '@/components/Button';
import Input from '@/components/Input';
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

	const TableHeaders = ['date', 'description', 'amount'];

	return (
		<>
			{/* // Container */}
			<div className='grid h-full w-full grid-cols-none grid-rows-[50px_60px_1fr] items-center gap-2'>
				{/* Title */}
				<h1 className='col-span-2 text-3xl font-bold'>Transactions</h1>
				{/* Action Section */}
				<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					<Button label='Add' />
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
				<div className='col-span-2 h-full w-full rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					{/* // Table Header */}
					<div className='grid grid-cols-3  border-b border-slate-300 pb-1 text-center text-sm capitalize text-slate-600'>
						{TableHeaders.map((header) => (
							<div className='hover:bg-slate-200' key={header}>
								{header}
							</div>
						))}
					</div>
					{/* To Open the dialog when a row is clicked make the row a client component */}
					{/* Table Data */}
					<div className='mt-1 grid'>
						{data.map((item) => (
							// Table raw
							<div
								className='grid h-10 w-full cursor-pointer grid-cols-3 items-center justify-center
								px-1
								capitalize
								odd:bg-blue-100
								even:bg-blue-200 hover:bg-blue-400'
								key={item.id}
							>
								<div>{new Date(item.date).toLocaleDateString('en-US')}</div>
								<div>{item.description}</div>
								<div className='text-right'>
									{(Math.round(item.amount * 100) / 100).toFixed(2)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
