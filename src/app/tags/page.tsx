import { getTagsService } from '@/ServerServices/ServerTagServices';
import Button from '@/components/Button';
import TagForm from '@/components/Forms/TagForm';
import Input from '@/components/Input';
import Table, { TableColumns } from '@/components/Table/Table';
import { Tag } from '@/server/models/Tag';
import React from 'react';

type TagResponse = {
	id: string;
	name: string;
};

const page = async () => {
	const data: TagResponse[] = await getTagsService();

	const columns: TableColumns[] = [
		{
			label: 'Name',
			accessor: 'name',
			columnSize: 1,
		},
	];

	return (
		<>
			{/* // Container */}
			<div className='grid h-full w-full grid-cols-none grid-rows-[50px_60px_1fr] items-center gap-2'>
				{/* Title */}
				<h1 className='col-span-2 text-3xl font-bold'>Tags</h1>
				{/* Action Section */}
				<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
					<TagForm title='Add' />
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
				<div className='col-span-2 mt-2 h-full w-full overflow-y-scroll rounded-lg bg-white px-4 drop-shadow-md'>
					<Table<Tag> columns={columns} data={data} UpdateDialog={TagForm} />
				</div>
			</div>
		</>
	);
};

export default page;
