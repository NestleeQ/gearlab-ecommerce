export interface iProducts {
	id: number
	slug: string
	imagePath: string
	title: string
	status: boolean
	price: number
}

interface iProductColors {
	id: number
	value: string
	label: string
}

interface iProductSizes {
	id: number
	size: string
}

export const productsBestSelling: iProducts[] = [
	{
		id: 0,
		slug: 'classic-monochrome-tees',
		imagePath: '/images/products/best-selling/cover-1.png',
		title: 'Classic Monochrome Tees',
		status: true,
		price: 3500
	},
	{
		id: 1,
		slug: 'monochromatic-wardrobe',
		imagePath: '/images/products/best-selling/cover-2.png',
		title: 'Monochromatic Wardrobe',
		status: true,
		price: 2700
	},
	{
		id: 2,
		slug: 'essential-neutrals',
		imagePath: '/images/products/best-selling/cover-3.png',
		title: 'Essential Neutrals',
		status: true,
		price: 2200
	},
	{
		id: 3,
		slug: 'utraanet-black',
		imagePath: '/images/products/best-selling/cover-4.png',
		title: 'UTRAANET Black',
		status: true,
		price: 4300
	}
]

export const productsFeatured: iProducts[] = [
	{
		id: 0,
		slug: 'elegant-ebony-sweatshirts',
		imagePath: '/images/products/featured/cover-1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 1,
		slug: 'sleek-and-cozy-black',
		imagePath: '/images/products/featured/cover-2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 2,
		slug: 'raw-black-tees',
		imagePath: '/images/products/featured/cover-3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 3,
		slug: 'mockup-black',
		imagePath: '/images/products/featured/cover-4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	}
]

export const productsCatalog: iProducts[] = [
	{
		id: 0,
		slug: 'elegant-ebony-sweatshirts',
		imagePath: '/images/products/featured/cover-1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 1,
		slug: 'sleek-and-cozy-black',
		imagePath: '/images/products/featured/cover-2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 2,
		slug: 'raw-black-tees',
		imagePath: '/images/products/featured/cover-3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 3,
		slug: 'mockup-black',
		imagePath: '/images/products/featured/cover-4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	},
	{
		id: 4,
		slug: 'elegant-ebony-sweatshirts',
		imagePath: '/images/products/featured/cover-1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 5,
		slug: 'sleek-and-cozy-black',
		imagePath: '/images/products/featured/cover-2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 6,
		slug: 'raw-black-tees',
		imagePath: '/images/products/featured/cover-3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 7,
		slug: 'mockup-black',
		imagePath: '/images/products/featured/cover-4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	},
	{
		id: 8,
		slug: 'elegant-ebony-sweatshirts',
		imagePath: '/images/products/featured/cover-1.png',
		title: 'Elegant Ebony Sweatshirts',
		status: true,
		price: 3500
	},
	{
		id: 9,
		slug: 'sleek-and-cozy-black',
		imagePath: '/images/products/featured/cover-2.png',
		title: 'Sleek and Cozy Black',
		status: true,
		price: 5700
	},
	{
		id: 10,
		slug: 'raw-black-tees',
		imagePath: '/images/products/featured/cover-3.png',
		title: 'Raw Black Tees',
		status: true,
		price: 1900
	},
	{
		id: 11,
		slug: 'mockup-black',
		imagePath: '/images/products/featured/cover-4.png',
		title: 'MOCKUP Black',
		status: true,
		price: 3000
	}
]

export const productColors: iProductColors[] = [
	{
		id: 0,
		label: 'blue',
		value: 'blue-400'
	},
	{
		id: 1,
		label: 'yellow',
		value: 'yellow-400'
	},
	{
		id: 2,
		label: 'green',
		value: 'green-400'
	},
	{
		id: 3,
		label: 'dark blur',
		value: 'blue-900'
	}
]

export const productSizes: iProductSizes[] = [
	{
		id: 0,
		size: 's'
	},
	{
		id: 1,
		size: 'm'
	},
	{
		id: 2,
		size: 'l'
	},
	{
		id: 3,
		size: 'xl'
	},
	{
		id: 4,
		size: 'xxl'
	}
]
