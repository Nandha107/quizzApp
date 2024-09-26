import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="h-[90vh] md:h-screen w-screen border-4 border-red-900 bg-gray-100">
			<Toast />
			<Outlet />
		</div>
	);
};
