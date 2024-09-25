import { useMutation } from '@tanstack/react-query';
import { UserClient } from '../../../services/staff/user/userClient';
import toast from 'react-hot-toast';
import { userStore } from '../../../store/user';
import { jwtDecode } from 'jwt-decode';

export const useUserStaff = () => {
	const { setUserStore } = userStore();
	const userLogin = useMutation({
		mutationFn: (body: { phone: string; password: string }) => UserClient.getUser(body),
		onSettled: (res) => {
			const decodedRes: User.userDetails = jwtDecode(res);
			setUserStore({ ...decodedRes });
			toast.success('User has successfully Logged in...');
		},
		onError: (error) => {
			toast.error(error.message ?? 'Sorry, Failed to Login, please try again');
		},
	});

	return { userLogin };
};
