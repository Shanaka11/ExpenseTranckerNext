import React, { ReactElement } from 'react';

export type ButtonProps = {
	label: string;
	icon?: ReactElement;
	hideicon?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
	return (
		<button
			{...props}
			className={`${
				props.icon ? '' : 'min-w-[100px]'
			} rounded bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-blue-200 ${
				props.className
			}`}
		>
			{props.icon && !props.hideicon ? props.icon : props.label}
		</button>
	);
};

export default Button;
