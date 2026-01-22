'use client'
import { useState } from 'react'
import SizeSelector from '../SizeSelector/SizeSelector'

interface iProductSizeSelector {
	availableSizes: string[]
	onSizeSelect?: (color: string) => void
	defaultSize?: string
}

export default function ProductSizeSelector({
	availableSizes,
	onSizeSelect,
	defaultSize
}: iProductSizeSelector) {
	const [selectedSize, setSelectedSize] = useState<string[]>(
		defaultSize ? [defaultSize] : []
	)

	const handleSizeChange = (sizes: string[]) => {
		setSelectedSize(sizes)
		if (onSizeSelect && sizes.length > 0) {
			onSizeSelect(sizes[0])
		}
	}

	return (
		<SizeSelector
			selectedSizes={selectedSize}
			onSizeChange={handleSizeChange}
			multiple={false}
			availableSizes={availableSizes}
		/>
	)
}
