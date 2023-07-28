'use client';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import RefreshIcon from '../Icons/RefreshIcon';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import TagFilterForm, { TagFilter, TagFilterKey } from '../Forms/TagFilterForm';
import Chip from '../Chip';
import { createQueryString, decodeFilterString } from '@/filterUtil';
import { SearchParams } from '@/ServerServices/SearchParamType';
import useFilter from './useFilter';

type TableActionProps = {
	children: ReactNode;
	searchParams: SearchParams;
};

const TableAction: React.FC<TableActionProps> = ({
	children,
	searchParams,
}) => {
	const router = useRouter();
	const { activeFilters, handleApplyFilter, handleRemoveFilter } = useFilter(
		'tags',
		searchParams
	);

	const handleRefresh = () => {
		router.refresh();
	};

	// For now use the hardcoded Tag filter dialog here, later pass the dialog component as a prop from the page
	return (
		<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
			{children}
			<div>
				{Object.entries(activeFilters).map((entry) => {
					if (entry[1] === '') return null;
					return (
						<Chip<TagFilterKey>
							key={entry[0]}
							itemKey={entry[0] as TagFilterKey}
							label={entry[0] + '' + entry[1] + ''}
							handleChipClose={handleRemoveFilter}
						/>
					);
				})}
			</div>
			<div className='flex gap-1'>
				<TagFilterForm
					handleDialogClose={handleApplyFilter}
					activeFilters={activeFilters as TagFilter}
				/>
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
