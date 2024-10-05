import { useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProfileDropdown from './profileModal';
import { Config } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { PrimaryButton } from '../buttons/primaryButton';
import { PlusIcon } from '../../assets/svg/plus';
import { useClickOutside } from '../../hooks/useClickOutSide';

const Header: React.FC = () => {
	const navigate = useNavigate();

	const location = useLocation();

	const { dept } = useParams();

	const [searchParams, _] = useSearchParams();

	const assessmentId = searchParams.get('assessmentId');

	const showNavBtn = location.pathname === '/create-assessment/mech';

	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem(Config.localStorageKeys.access_token);
		localStorage.removeItem(Config.localStorageKeys.dept);
		navigate('/');
	};

	const clickOutSideRef = useClickOutside(() => setIsProfileDropdownOpen(false));

	const toggleProfileDropdown = () => {
		setIsProfileDropdownOpen(!isProfileDropdownOpen);
	};

	const token = localStorage.getItem(Config.localStorageKeys.access_token);
	// let userRole = '';
	let userDetails = null;

	if (token) {
		try {
			const decodedToken: User.userDetails = jwtDecode(token);
			// userRole = decodedToken.role;
			userDetails = decodedToken; // Adjust as per your token structure
		} catch (error) {
			console.error('Error decoding token:', error);
		}
	}

	return (
		<div
			ref={clickOutSideRef}
			className="flex items-center justify-center w-full h-full bg-white"
		>
			<div className="flex flex-col justify-center w-[50%] text-xl text-primary font-bold">
				<p className="">
					Hello, {userDetails?.name}{' '}
					<span role="img" aria-label="wave">
						👋
					</span>
				</p>
				<p className="text-xs text-teal-950/50">Welcome to Assessment</p>
			</div>
			<div className="w-[50%] flex justify-end items-center gap-5">
				{userDetails?.role !== 'STUDENT' && (!showNavBtn && !assessmentId) ? (
					<div className="items-center justify-center hidden rounded-lg md:flex">
						<PrimaryButton
							text="Create Assessment"
							icon={<PlusIcon />}
							// onClick={() => navigate(`/staff-dashboard/${getDept}/create-assessment`)}
							onClick={() => navigate(`/create-assessment/${dept}`)}
						/>
					</div>
				) : null}

				{/* Right section - Profile circle */}
				<div
					className="relative flex items-center h-full hover:cursor-pointer"
					onClick={toggleProfileDropdown}
				>
					{/* Profile button */}
					<div
						onClick={toggleProfileDropdown}
						className="relative text-gray-900 dark:text-white"
					>
						<div className="flex items-center justify-center text-teal-600 border-2 border-teal-600 rounded-full w-11 h-11 md:h-12 md:w-12 bg-teal-600/25">
							<span className="text-lg font-semibold">
								{userDetails?.name?.charAt(0) || 'U'}
							</span>
						</div>
						{isProfileDropdownOpen && (
							<ProfileDropdown
								isOpen={isProfileDropdownOpen}
								onLogout={handleLogout}
								userDetails={userDetails}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
