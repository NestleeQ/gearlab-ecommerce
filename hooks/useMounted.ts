import { useEffect, useState } from 'react'

export function useMounted() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setTimeout(() => setMounted(true), 0)
	}, [])

	return mounted
}
