import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="h-screen w-screen bg-gray-100">
			<Toast />
			<Outlet />
		</div>
	);
};
