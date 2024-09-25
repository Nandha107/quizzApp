import { useNavigate } from 'react-router-dom';
import { Config } from '../config';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { StudentRole } from '../assets/svg/studentRole';
import { StaffRole } from '../assets/svg/staffRole';
import { PrimaryOutlineButton } from '../component/buttons/primaryOutlineButton';
const DefaultPage = () => {
	const navigate = useNavigate();

	const isTokenThere = localStorage.getItem(Config.localStorageKeys.access_token);

	useEffect(() => {
		if (isTokenThere) {
			const userDetails: User.userDetails = jwtDecode(isTokenThere);
			if (userDetails.role === 'ADMIN') {
				navigate('/staff-dashboard/courses');
				return;
			}
		}
	}, []);

	return (
		<div className="flex items-center justify-center w-full h-full p-5">
			<div className="w-full h-full md:w-[80%] lg:w-[50%] flex flex-col items-center justify-center gap-8">
				<div className="flex justify-center items-center w-full text-primary font-bold">
					<p className="text-xl md:text-3xl">Choose Your Role</p>
				</div>
				<div className="flex w-full justify-center items-center gap-5 md:gap-10 lg:gap-16">
					<div
						className="group p-5 md:w-[39%] md:min-h-[250px] lg:w-[35%] rounded-xl flex flex-col gap-3 justify-center bg-white shadow-md border border-gray-300 hover:cursor-pointer hover:border hover:border-teal-600 hover:bg-teal-600/10"
						onClick={() => {
							navigate('/student-login');
						}}
					>
						<div>
							<div className="h-full w-full flex items-center justify-center">
								<StudentRole className="w-36 md:h-52 lg:h-48" />
							</div>
							<div className="text-center md:pb-4 pt-1">
								<p className="text-sm md:text-xl text-gray-950 font-semibold">
									Student
								</p>
							</div>
						</div>
						<PrimaryOutlineButton
							text="Select"
							className="group-hover:bg-hoverPrimary font-bold md:h-[3rem] md:max-h-[3rem] md:text-xl"
						/>
					</div>
					<div
						className="group p-5 md:w-[39%] md:min-h-[250px] lg:w-[35%] rounded-lg flex flex-col gap-3 justify-center bg-white shadow-md border border-gray-300 hover:cursor-pointer hover:border hover:border-teal-600 hover:bg-teal-600/10"
						onClick={() => {
							navigate('/admin-login');
						}}
					>
						<div>
							<div className="h-full w-full flex items-center justify-center">
								<StaffRole className="w-36 md:h-52 lg:h-48" />
							</div>
							<div className="text-center md:pb-4 pt-1">
								<p className="text-sm md:text-xl text-gray-950 font-semibold">
									Admin
								</p>
							</div>
						</div>
						<PrimaryOutlineButton
							text="Select"
							className="group-hover:bg-hoverPrimary font-bold md:h-[3rem] md:max-h-[3rem] md:text-xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DefaultPage;
