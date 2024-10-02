import { Outlet } from 'react-router-dom';
import { Toast } from '../toast';

interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = ({}) => {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<Toast />
			<Outlet />
		</div>
	);
};
