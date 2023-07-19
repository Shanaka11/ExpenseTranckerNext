import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputSize = 'SMALL' | 'LARGE';

type InputProps = {
	label?: string;
	id: string;
	inputsize?: InputSize;
	containermargin?: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<div
			className={`relative ${
				props.containermargin ? props.containermargin : 'my-4'
			}`}
		>
			<input
				{...props}
				ref={ref}
				className={`border-1 peer block w-full appearance-none rounded-lg border border-gray-300 px-2.5 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
					props.className ? props.className : ' '
				} ${
					props.label != undefined || props.inputsize === 'SMALL'
						? 'pt-2.5'
						: 'pt-4'
				}`}
				placeholder={props.label != undefined ? ' ' : props.placeholder}
			/>
			{props.label != undefined && (
				<label
					htmlFor={props.id}
					className='absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600'
				>
					{props.label}
				</label>
			)}
			{props.error && (
				<p className='ml-1 text-xs text-red-500'>{props.error}</p>
			)}
		</div>
	);
});

Input.displayName = 'CustomInput';

export default Input;
