import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="w-screen h-screen border bg-gray-100">
			<Toast />
			<Outlet />
		</div>
	);
};
