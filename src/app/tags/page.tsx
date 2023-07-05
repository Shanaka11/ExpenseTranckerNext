import Button from '@/components/Button';
import Input from '@/components/Input';
import { auth } from '@clerk/nextjs';
import React from 'react';

type TagResponse = {
	id: string;
	name: string;
};

const getTags: () => Promise<TagResponse[]> = async () => {
	const { getToken } = auth();
	const token = await getToken();
	const res = await fetch('http://localhost:3000/api/tag', {
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
	const data = await getTags();

	console.log(data);

	return (
		<>
			{/* // Container */}
			<div className='grid h-full w-full grid-rows-[50px_60px_1fr] items-center gap-2'>
				{/* Title */}
				<h1 className='col-span-2 text-3xl font-bold'>Tags</h1>
				{/* Action Section */}
				<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					<Button label='Add' />
					{/* // Add Item Button
				// Search Box */}
					<form className='flex'>
						<Input
							label='Search Tags'
							id='SearchTags'
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
					<div className='border-b border-slate-300 pb-1 text-center text-sm text-slate-600'>
						<div>Name</div>
					</div>
					{/* Table Data */}
					<div className='mt-1 grid'>
						{data.map((item: any) => (
							// Table raw
							<div
								className='flex h-10 w-full cursor-pointer justify-center capitalize
								odd:bg-blue-100
								even:bg-blue-300
								hover:bg-blue-400'
								key={item.id}
							>
								{item.name}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
