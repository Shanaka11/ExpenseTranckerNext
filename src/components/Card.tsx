import React from 'react';

type CardProps = {
	title: string;
	value: number;
};

const Card: React.FC<CardProps> = ({ title, value }) => {
	return (
		<div className='col-span-2 flex h-28 w-full flex-col rounded-lg bg-white px-4 py-2 md:h-full lg:col-span-1'>
			<h2 className='font-extrabold'>{title}</h2>
			<p className='mb-auto mt-auto text-center text-lg'>
				{value.toLocaleString(undefined, {
					maximumFractionDigits: 2,
					minimumFractionDigits: 2,
				})}
			</p>
		</div>
	);
};

export default Card;
