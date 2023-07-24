'use client';
import React, { ReactElement, ReactNode } from 'react';
import RefreshIcon from '../Icons/RefreshIcon';
import Button from '../Button';
import { useRouter } from 'next/navigation';

type TableActionProps = {
	children: ReactNode;
};

const TableAction: React.FC<TableActionProps> = ({ children }) => {
	const router = useRouter();

	const handleRefresh = () => {
		router.refresh();
	};

	return (
		<div className='col-span-2 flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2 drop-shadow-md'>
			{children}
			<Button
				label='Refresh'
				title='Refresh'
				icon={<RefreshIcon />}
				onClick={(event) => handleRefresh()}
			/>
		</div>
	);
};

export default TableAction;
