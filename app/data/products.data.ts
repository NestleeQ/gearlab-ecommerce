export interface iProducts {
	id: number
	slug: string
	imagePath: string
	title: string
	status: boolean
	price: number
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
