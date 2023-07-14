'use client';
import React, { ReactNode, useState } from 'react';
import CloseIcon from '../Icons/CloseIcon';
import Button, { ButtonProps } from '../Button';

type DialogProps = {
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	title: string;
	formId?: string; // Form inside the dialog if any
	defaultSubmit?: boolean;
	handleSubmitAndClose: () => void;
	children: ReactNode;
	additionalActions?: ReactNode;
	dialogButtonProps?: ButtonProps;
	isLoading?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
	open,
	handleClose,
	handleOpen,
	title,
	defaultSubmit = true,
	children,
	additionalActions,
	dialogButtonProps,
	formId,
	handleSubmitAndClose,
	isLoading,
}) => {
	return (
		<>
			<Button
				label='Add New Transaction'
				onClick={() => handleOpen()}
				{...dialogButtonProps}
			/>
			{open && (
				<>
					<div
						className='absolute left-0 top-0 z-20 h-screen w-screen cursor-pointer bg-slate-800/75'
						onClick={() => handleClose()}
					/>
					<div className='absolute right-0 top-0 z-30 grid h-screen w-screen grid-rows-[40px_1fr_40px] bg-white p-2 md:w-96'>
						<div className='flex items-center justify-between'>
							<h1>{title}</h1>
							{/* This button is common to all dialogs so keep this in the common component */}
							<button onClick={() => handleClose()}>
								<CloseIcon />
							</button>
						</div>
						{children}
						<div className='flex'>
							{additionalActions}
							<div className='ml-auto flex'>
								<Button
									onClick={() => handleSubmitAndClose()}
									type={defaultSubmit ? 'submit' : 'submit'}
									form={defaultSubmit ? formId : formId}
									label='Add'
									disabled={isLoading}
								/>
								<Button
									onClick={() => handleClose()}
									label='Cancel'
									className='ml-2 bg-red-400 hover:bg-red-500 disabled:bg-red-200'
									disabled={isLoading}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Dialog;
