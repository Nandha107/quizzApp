import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="w-screen h-screen border-4 border-red-900 overflow-y-auto">
			<Toast />
			<Outlet />
		</div>
	);
};
