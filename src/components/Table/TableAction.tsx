'use client';
import React, { ReactElement, ReactNode, useState } from 'react';
import RefreshIcon from '../Icons/RefreshIcon';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import TagFilterForm from '../Forms/TagFilterForm';

type TableActionProps = {
	children: ReactNode;
};

const TableAction: React.FC<TableActionProps> = ({ children }) => {
	// TODO: Add filter chips to remove filters
	const router = useRouter();

	const handleApplyFilter = (queryString: string) => {
		router.push(`tags/${queryString}`);
	};

	const handleRefresh = () => {
		router.refresh();
	};

	// For now use the hardcoded Tag filter dialog here, later pass the dialog component as a prop from the page
	return (
		<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
			{children}
			<div className='flex gap-1'>
				<TagFilterForm handleDialogClose={handleApplyFilter} />
				{/* <Button
					label='Filter Data'
					title='Filter Data'
					icon={<FilterIcon />}
					onClick={() => handleFilterClick()}
				/> */}
				<Button
					label='Refresh'
					title='Refresh'
					icon={<RefreshIcon />}
					onClick={(event) => handleRefresh()}
				/>
			</div>
		</div>
	);
};

export default TableAction;
