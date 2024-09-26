import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../spinner/loadingSpinner';
import Header from '../Navigation/header';
import { Config } from '../../config';
// import { jwtDecode } from 'jwt-decode';

interface AuthLayout {}

export const AuthLayout: React.FC<AuthLayout> = ({}) => {
	const navigate = useNavigate();

	const isLoggedIn = localStorage.getItem(Config.localStorageKeys.access_token);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/', { replace: true });
			return;
		}

		// if (!isLoggedIn) navigate('/logout', { replace: true });
	}, []);

	if (!isLoggedIn)
		return <LoadingSpinner text="You are being logged out" className="text-teal-600" />;

	return (
		<div className="flex flex-col w-screen h-[90vh] md:h-screen border-4 border-red-900">
			<div className="h-[7%] w-full px-2 md:px-5 shadow-lg bg-white">
				<Header />
			</div>
			<div className="h-[93%] w-full">
				<div className="w-full h-full transition-all duration-700 bg-slate-600/5">
					<Suspense
						fallback={
							<LoadingSpinner text="Please wait while loading goodies..." />
						}
					>
						<Outlet />
					</Suspense>
				</div>
			</div>
		</div>
	);
};
// <div className="fixed top-0 left-0 flex flex-col w-full h-full border-4 border-red-900">
// 	<div className="h-[10%] sm:h-[10%] md:h-[9%] lg:h-[9%] xl:h-[8%] 2xl:h-[7%] w-full shadow-md z-[10000]">
// 		<Header />
// 	</div>
// 	<div className="flex w-full h-full">
// 		<div className="w-full h-full transition-all duration-700 bg-slate-600/5">
// 			<Suspense
// 				fallback={
// 					<LoadingSpinner text="Please wait while loading goodies..." />
// 				}
// 			>
// 				<Outlet />
// 			</Suspense>
// 		</div>
// 	</div>
// </div>
