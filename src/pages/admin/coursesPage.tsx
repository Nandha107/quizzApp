import { CoursesData } from '../../utils/courses';
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config';

const CoursesPage = () => {
	const navigate = useNavigate();

	return (
		<div className="items-center justify-center w-full h-full flex flex-col md:p-5">
			<div className="w-full flex justify-center items-center h-[10%]">
				<p className="text-xl md:text-3xl lg:text-4xl font-bold bg-text-gradient bg-clip-text text-transparent">
					Choose your department
				</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center w-full h-full md:h-[50%] gap-x-5 gap-y-5 p-3 overflow-y-scroll">
				{CoursesData.map((dept, index) => (
					<div
						key={index}
						onClick={() => {
							localStorage.setItem(
								Config.localStorageKeys.dept,
								dept.key as string,
							);
							navigate(`/staff-dashboard/${dept.path}?tab=assessments`);
						}}
						className={`flex flex-col h-full lg:w-[15%] lg:h-[60%] transition duration-300 transform bg-white rounded-lg lg:col-span-1 shadow-lg hover:shadow-xl hover:scale-105 hover:cursor-pointer
							${index === CoursesData.length - 1 ? 'col-span-2 justify-self-center w-[50%] md:col-start-2 md:col-end-4 md:justify-self-center md:row-start-2 lg:col-span-4 lg:row-start-1 md:ml-6 lg:ml-0' : ''}
							${index === 3 ? 'md:w-[50%] md:col-start-1 md:col-end-3 md:justify-self-center md:row-start-2 lg:col-start-4 lg:row-start-1' : ''}
							`}
					>
						<div className="w-full h-[80%] flex items-center justify-center rounded-t-lg">
							<p className="text-xl md:text-3xl font-semibold">{dept.Dept}</p>
						</div>
						<div className="w-full flex h-[20%] bg-btn-gradient items-center justify-center rounded-b-lg">
							<p className="text-xl text-white font-semibold">Select</p>
							{/* <button className="w-full h-full text-sm font-medium text-white rounded-b-lg sm:text-base md:text-lg lg:text-xl bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500">
								Select
							</button> */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default CoursesPage;
