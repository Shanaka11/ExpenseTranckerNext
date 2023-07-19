import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = {
	label?: string;
	id: string;
	error?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const InputArea = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
	return (
		<div className='relative my-4'>
			<textarea
				rows={4}
				{...props}
				ref={ref}
				className={`border-1 peer block w-full resize-none appearance-none rounded-lg border border-gray-300 px-2.5 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 ${
					props.className
				} ${props.label != undefined ? 'pt-4' : 'pt-2.5'}`}
				placeholder={props.label != undefined ? ' ' : props.placeholder}
			/>
			{props.label != undefined && (
				<label
					htmlFor={props.id}
					className='absolute left-1 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600'
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

/*
<label
					htmlFor={props.id}
					className='absolute left-1 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600'
				>
 */

InputArea.displayName = 'Text Area';

export default InputArea;
