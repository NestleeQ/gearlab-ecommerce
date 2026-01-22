'use client'
import { useState } from 'react'
import ColorSelector from '../ColorSelector/ColorSelector'

interface iProductColorSelector {
	availableColors: string[]
	onColorSelect?: (color: string) => void
	defaultColor?: string
}

export default function ProductColorSelector({
	availableColors,
	onColorSelect,
	defaultColor
}: iProductColorSelector) {
	const [selectedColor, setSelectedColor] = useState<string[]>(
		defaultColor ? [defaultColor] : []
	)

	const handleColorChange = (colors: string[]) => {
		setSelectedColor(colors)
		if (onColorSelect && colors.length > 0) {
			onColorSelect(colors[0])
		}
	}

	return (
		<ColorSelector
			selectedColors={selectedColor}
			onColorChange={handleColorChange}
			multiple={false}
			availableColors={availableColors}
		/>
	)
}
