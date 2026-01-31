'use client'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<Toaster
				position='bottom-left'
				toastOptions={{
					classNames: {
						toast: 'bg-white border border-neutral-200 shadow-lg',
						title: 'text-neutral-900 font-medium',
						description: 'text-neutral-600',
						actionButton: 'bg-neutral-900 text-white',
						cancelButton: 'bg-neutral-100 text-neutral-900',
						closeButton: 'bg-neutral-100 text-neutral-600'
					}
				}}
				duration={3000}
			/>
		</>
	)
}
