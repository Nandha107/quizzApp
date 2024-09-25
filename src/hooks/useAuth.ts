import { jwtDecode } from 'jwt-decode';
import { Config } from '../config';

export const useAuth = () => {
	try {
		const token = localStorage.getItem(Config.localStorageKeys.access_token);

		if (!token) return null;

		const decodeToken = jwtDecode(token) as User.userDetails;

		const isExpired = Date.now() > decodeToken?.exp * 1000;

		return !decodeToken.sub || !decodeToken?.exp || isExpired ? false : true;
	} catch (err) {
		return false;
	}
};
