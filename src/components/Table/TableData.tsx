'use client';
import React, { ComponentType, useState } from 'react';
import { TableMatrix } from './Table';
import { TransactinFormProps } from '../Forms/TransactionForm';

type TableDataProps<T> = {
	columnLayout: string;
	data: TableMatrix[];
	UpdateDialog: ComponentType<TransactinFormProps>;
	updateDialogProps?: TransactinFormProps;
};

const TableData = <T,>({
	columnLayout,
	data,
	UpdateDialog,
	updateDialogProps,
}: TableDataProps<T>) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [currentDataItem, setCurrentDataItem] = useState<T>(data[0].dataItem);

	const handleRowOnClick = (dataItem: T) => {
		setCurrentDataItem(dataItem);
		setOpenDialog(true);
	};

	const dialogOnClose = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<UpdateDialog
				title='Update Transaction'
				open={openDialog}
				dataItem={currentDataItem}
				noOpenButton={true}
				handleDialogClose={() => dialogOnClose()}
				{...updateDialogProps}
			/>
			<div className='mt-1 grid'>
				{data.map((item) => (
					// Table raw
					<div
						className={`grid h-10 w-full cursor-pointer items-center justify-center
								px-1
								capitalize
								odd:bg-blue-100
								even:bg-blue-200 hover:bg-blue-400`}
						style={{ gridTemplateColumns: columnLayout }}
						key={item.dataItem.id}
						onClick={(event) => handleRowOnClick(item.dataItem)}
					>
						{item.cells.map((cell, index) => {
							if (cell === null) {
								<div key={'null-' + index}></div>;
							} else {
								return (
									<div
										className={`overflow-hidden text-ellipsis whitespace-nowrap ${cell.align}`}
										key={cell.key}
									>
										{cell.label}
									</div>
								);
							}
						})}
					</div>
				))}
			</div>
		</>
	);
};

export default TableData;
