import React from 'react';

type ChipProps<FilterKey> = {
	itemKey: FilterKey;
	label: string;
	handleChipClose: (key: FilterKey) => void;
};

const Chip = <FilterKey,>({
	itemKey,
	label,
	handleChipClose,
}: ChipProps<FilterKey>) => {
	return (
		<span className='mr-2 inline-flex cursor-pointer items-center rounded bg-blue-400 px-2 py-1 text-sm font-medium capitalize text-white hover:bg-blue-500'>
			{label}
			<button
				type='button'
				className='ml-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300'
				data-dismiss-target='#badge-dismiss-default'
				aria-label='Remove'
				onClick={() => handleChipClose(itemKey)}
			>
				<svg
					className='h-2 w-2'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 14 14'
				>
					<path
						stroke='white'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
					/>
				</svg>
				<span className='sr-only'>Remove badge</span>
			</button>
		</span>
	);
};

export default Chip;
