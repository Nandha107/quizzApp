import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="w-screen h-[95vh] md:h-screen border-4 border-red-900 bg-gray-100">
			<Toast />
			<Outlet />
		</div>
	);
};
