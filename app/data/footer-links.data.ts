interface iIcon {
	path: string
	width: number
	height: number
}

export interface iLink {
	id: string
	label: string
	icon?: iIcon
	url: string
}

export const supportLinks: iLink[] = [
	{
		id: 'faq',
		label: 'FAQ',
		url: '/faq'
	},
	{
		id: 'term-of-use',
		label: 'Terms of use',
		url: '/term-of-use'
	},
	{
		id: 'privacy-policy',
		label: 'Privacy Policy',
		url: '/privacy-policy'
	}
]

export const companyLinks: iLink[] = [
	{
		id: 'about-us',
		label: 'About us',
		url: '/about-us'
	},
	{
		id: 'contact',
		label: 'Contact',
		url: '/contact'
	},
	{
		id: 'careers',
		label: 'Careers',
		url: '/careers'
	}
]

export const shopLinks: iLink[] = [
	{
		id: 'about-us',
		label: 'My Account',
		url: '/my-account'
	},
	{
		id: 'checkout',
		label: 'Checkout',
		url: '/checkout'
	},
	{
		id: 'cart',
		label: 'Cart',
		url: '/cart'
	}
]

export const acceptedPaymentsLinks: iLink[] = [
	{
		id: 'master-card',
		label: '',
		url: '/',
		icon: {
			path: '/icons/payments/master-card-ic.svg',
			width: 30,
			height: 18
		}
	},
	{
		id: 'amex',
		label: '',
		url: '/',
		icon: {
			path: '/icons/payments/amex-ic.svg',
			width: 46,
			height: 18
		}
	},
	{
		id: 'visa',
		label: '',
		url: '/',
		icon: {
			path: '/icons/payments/visa-ic.svg',
			width: 42,
			height: 18
		}
	}
]
