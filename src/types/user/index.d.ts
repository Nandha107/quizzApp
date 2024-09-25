declare module User {
	interface userDetails {
		email: string;
		name: string;
		sub: string;
		role: 'ADMIN' | 'STUDENT';
		iat: number;
		exp: number;
	}
}
