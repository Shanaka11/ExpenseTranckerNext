'use client';
import React, { ComponentType, ReactNode } from 'react';
import RefreshIcon from '../Icons/RefreshIcon';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import Chip from '../Chip';
import { SearchParams } from '@/ServerServices/SearchParamType';
import useFilter, { BaseObjectType } from './useFilter';

type FilterDialogProps = {
	handleDialogClose: (queryFilters: BaseObjectType) => void;
	activeFilters: BaseObjectType;
	options?: any;
};

type TableActionProps = {
	children: ReactNode;
	searchParams: SearchParams;
	baseUrl: string;
	FilterDialog: ComponentType<FilterDialogProps>;
	filterDialogOptions?: any;
};

const TableAction: React.FC<TableActionProps> = ({
	children,
	searchParams,
	baseUrl,
	FilterDialog,
	filterDialogOptions,
}) => {
	const router = useRouter();
	const { activeFilters, handleApplyFilter, handleRemoveFilter } = useFilter(
		baseUrl,
		searchParams
	);

	const handleRefresh = () => {
		router.refresh();
	};

	return (
		<div className='col-span-2 flex h-14 w-full items-center justify-between gap-1 overflow-x-auto rounded-lg bg-white px-4 py-2 drop-shadow-md'>
			<div>{children}</div>
			<div className='flex-shrink-0'>
				{Object.entries(activeFilters).map((entry) => {
					if (entry[1] === '') return null;
					return (
						<Chip
							key={entry[0]}
							itemKey={entry[0]}
							label={entry[0] + '' + entry[1] + ''}
							handleChipClose={handleRemoveFilter}
						/>
					);
				})}
			</div>
			<div className='flex gap-1'>
				<FilterDialog
					handleDialogClose={handleApplyFilter}
					activeFilters={activeFilters}
					options={filterDialogOptions}
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
