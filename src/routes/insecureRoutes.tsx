import { RouteObject } from 'react-router-dom';
import SignUp from '../pages/student/signup';
import AdminLogin from '../pages/admin/login';
import StudentLogin from '../pages/student/login';
import DefaultPage from '../pages/defaultPage';

export const insecureRoutes: RouteObject[] = [
	{
		path: '/',
		element: <DefaultPage />,
	},
	{
		path: '/admin-login',
		element: <AdminLogin />,
	},
	{
		path: '/student-login',
		element: <StudentLogin />,
	},
	{
		path: '/student-signup',
		element: <SignUp />,
	},
];
