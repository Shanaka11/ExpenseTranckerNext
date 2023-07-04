import Button from '@/components/Button';
import Input from '@/components/Input';
import React from 'react';

const page = () => {
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
							containerMargin='m-0'
							InputSize='SMALL'
						/>
						<Button label='Search' type='submit' className='ml-1' />
					</form>
				</div>
				{/* // Table Container */}
				<div className='col-span-2 h-full w-full rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					<div>{/* // Table Header */}</div>
					<div>{/* // Table Data */}</div>
				</div>
			</div>
		</>
	);
};

export default page;
