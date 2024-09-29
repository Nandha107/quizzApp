import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Config } from '../../../config';

export class UserClient {
	static async getUser(props: { phone: string; password: string }) {
		try {
			const res = await axios.post(`/auth/admin/login`, props);

			const token = res.data?.access_token;

			// Store token in localStorage
			localStorage.setItem(Config.localStorageKeys.access_token, token);

			const decodedToken: User.userDetails = jwtDecode(token);

			console.log('Decoded token: ======> ', decodedToken);

			return token;
		} catch (error) {
			console.log('original error while getting User Details', error);

			throw error;
		}
	}

	// static async getAllAssessments(course: string) {
	// 	try {
	// 		const res = await axios.get<Assessments.GetAssessmentResponse[]>(
	// 			`/tests/category/${course}`,
	// 		);
	// 		return res.data;
	// 	} catch (error) {
	// 		console.log(error);

	// 		throw error;
	// 	}
	// }
}
