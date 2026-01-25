export interface iUser {
	id: string
	name: string
	email: string
	password: string
}

export interface iAuthState {
	user: iUser | null
	isAuthenticated: boolean
}

export interface iLogin {
	email: string
	password: string
	global?: string
}
