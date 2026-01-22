import { cn } from '@/lib/utils'

interface iText {
	className?: string
	color?: 300 | 400 | 500 | 600
	children: React.ReactNode
}

export default function Text({ className, color = 500, children }: iText) {
	return (
		<p
			className={cn(
				'text-body',
				color == 300 && 'text-neutral-300',
				color == 400 && 'text-neutral-400',
				color == 500 && 'text-neutral-500',
				color == 600 && 'text-neutral-600',
				className
			)}
		>
			{children}
		</p>
	)
}
