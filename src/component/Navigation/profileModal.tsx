interface ProfileDropdownProps {
	isOpen: boolean;
	onLogout: () => void;
	userDetails: any; // Replace with actual type if available
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
	isOpen,
	onLogout,
	userDetails,
}) => {
	if (!isOpen) return null;

	return (
		<div className="absolute right-0 top-14 w-[17rem] overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-[10000]">
			<div className="px-3 py-3 border-b border-gray-200">
				<div className="flex flex-col justify-start text-start">
					<p className="font-medium text-primary">User name</p>
					<p className="text-md text-black font-semibold ">
						{userDetails?.name || 'User'}
					</p>
				</div>
			</div>
			<div className="px-4 py-3 border-b border-gray-200">
				<div className="flex flex-col justify-start text-start">
					<p className="font-medium text-primary">Phone number</p>
					<p className="text-md text-black font-semibold ">
						{userDetails?.phoneNumber || '1234567890'}
					</p>
				</div>
			</div>
			<div className="p-3 flex justify-center items-center">
				<button
					onClick={onLogout}
					className="border border-[#FF3D00] rounded-md w-full px-4 py-3 text-center text-lg text-[#FF3D00] transition-colors hover:bg-red-500/10"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfileDropdown;
