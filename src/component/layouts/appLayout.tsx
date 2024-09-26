import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="h-[95vh] md:h-screen w-screen border border-red-900 bg-gray-100">
			<Toast />
			<Outlet />
		</div>
	);
};
