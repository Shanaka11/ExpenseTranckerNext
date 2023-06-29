import React from 'react';

type ButtonProps = {
	label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
	return (
		<button
			{...props}
			className={`min-w-[100px] rounded bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500 ${props.className}`}
		>
			{props.label}
		</button>
	);
};

export default Button;
