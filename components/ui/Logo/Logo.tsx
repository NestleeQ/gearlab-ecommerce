import { Manrope } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const manropeSans = Manrope({
	variable: '--font-manrope-sans',
	subsets: ['latin']
})

export default function Logo() {
	return (
		<Link
			href='/'
			className='flex items-center'
		>
			<div className='flex justify-center items-center w-11 h-10 bg-neutral-900 rounded-full'>
				<Image
					src='/icons/logo.svg'
					alt='GearLab logo'
					width={24}
					height={24}
				/>
			</div>
			<p
				className={`${manropeSans.variable} antialiased text-xl font-extrabold tracking-[-3.5%] ml-3 text-neutral-900`}
			>
				GearLab
			</p>
		</Link>
	)
}
