import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = {
	label?: string;
	id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<div className='relative my-4'>
			<input
				{...props}
				ref={ref}
				className={`border-1 peer block w-full appearance-none rounded-lg border border-gray-300 px-2.5 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 ${
					props.className
				} ${props.label != undefined ? 'pt-4' : 'pt-2.5'}`}
				placeholder={props.label != undefined ? ' ' : props.placeholder}
			/>
			{props.label != undefined && (
				<label
					htmlFor={props.id}
					className='absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500'
				>
					{props.label}
				</label>
			)}
		</div>
	);
});

Input.displayName = 'CustomInput';

export default Input;
