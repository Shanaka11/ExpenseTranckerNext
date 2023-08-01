import LoadingSpinner from '@/components/LoadingSpinner';

const loading = () => {
	return (
		<div className='fixed left-0 top-0 grid h-screen w-screen place-items-center bg-slate-900 opacity-80'>
			<LoadingSpinner />
		</div>
	);
};

export default loading;
