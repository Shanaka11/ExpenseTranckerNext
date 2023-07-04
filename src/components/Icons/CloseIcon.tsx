import React from 'react';

interface CloseIconProps {
	classname?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({ classname }) => {
	return (
		<svg
			className={`${classname} cursor-pointer fill-slate-400 p-1 transition-colors hover:fill-slate-950`}
			xmlns='http://www.w3.org/2000/svg'
			height='30'
			viewBox='0 -960 960 960'
			width='30'
		>
			<path d='m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z' />
		</svg>
	);
};

export default CloseIcon;
