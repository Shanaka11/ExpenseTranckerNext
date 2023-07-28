import { SearchParams } from '@/ServerServices/SearchParamType';
import { getTagsService } from '@/ServerServices/ServerTagServices';
import TagForm from '@/components/Forms/TagForm';
import Table, { TableColumns } from '@/components/Table/Table';
import TableAction from '@/components/Table/TableAction';
import { Tag } from '@/server/models/Tag';
import React from 'react';

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
	const data = await getTagsService({
		searchParams,
	});

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
				<TableAction searchParams={searchParams}>
					<TagForm title='Add' />
				</TableAction>
				{/* // Table Container */}
				<div className='col-span-2 mt-2 h-full w-full overflow-y-scroll rounded-lg bg-white px-4 drop-shadow-md'>
					<Table<Tag> columns={columns} data={data} UpdateDialog={TagForm} />
				</div>
			</div>
		</>
	);
};

export default page;
