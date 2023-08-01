import Button from '@/components/Button';
import Image from 'next/image';
export default function Home() {
	return (
		<>
			{/* Hero */}
			<div className='relative col-span-2 grid h-96 place-items-center md:h-[35rem]'>
				<Image
					src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/35cc357a76a5471b977d99e93dcdad97.jpg'
					alt='hero'
					fill
					className='absolute'
					style={{
						objectFit: 'cover',
					}}
				/>
				<div className='z-10 px-10 md:px-8'>
					<h1
						className='text-6xl font-bold text-white'
						style={{ textShadow: '-7px 4px 5px black' }}
					>
						Take Control of Your Finances
					</h1>
					<div className='mt-3 flex gap-1 md:justify-center'>
						<Button label='Vist Dashboard' />
						<Button label='Try for free' />
					</div>
				</div>
			</div>
			{/* Features */}
			<div></div>
			{/* Footer */}
		</>
	);
}
