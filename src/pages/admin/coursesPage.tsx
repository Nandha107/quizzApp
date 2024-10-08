import { CoursesData } from '../../utils/courses';
import { useNavigate } from 'react-router-dom';
import { Config } from '../../config';

const CoursesPage = () => {
	const navigate = useNavigate();

	return (
		<div className="items-center justify-center w-full h-full flex flex-col md:p-5">
			<div className="w-full flex justify-center items-center py-5">
				<p className="text-3xl lg:text-4xl font-bold bg-text-gradient bg-clip-text text-transparent">
					Choose your department
				</p>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-5 w-full gap-x-5 gap-y-5 px-10 pb-7 overflow-y-scroll">
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
						className={`rounded-xl min-h-[190px] max-h-[190px] shadow-lg hover:cursor-pointer group`}
					>
						<div className="w-full flex items-center justify-center border bg-white rounded-t-xl h-[75%] px-5 group-hover:bg-gradient-to-br group-hover:from-teal-600/40 group-hover:via-teal-600/10 group-hover:to-teal-600/40">
							<p className="text-xl lg:text-base font-semibold text-center">
								{dept.Abbreviation}
							</p>
						</div>
						<div className="w-full flex bg-btn-gradient items-center justify-center rounded-b-xl h-[25%]">
							<p className="text-xl text-white font-semibold">Select</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default CoursesPage;

// import { CoursesData } from '../../utils/courses';
// import { useNavigate } from 'react-router-dom';
// import { Config } from '../../config';

// const CoursesPage = () => {
// 	const navigate = useNavigate();

// 	return (
// 		<div className="items-center justify-center w-full h-full flex flex-col md:p-5">
// 			<div className="w-full flex justify-center items-center h-[10%]">
// 				<p className="text-xl md:text-3xl lg:text-4xl font-bold bg-text-gradient bg-clip-text text-transparent">
// 					Choose your department
// 				</p>
// 			</div>
// 			<div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center w-full h-full md:h-[50%] gap-x-5 gap-y-5 p-3 overflow-y-scroll">
// 				{CoursesData.map((dept, index) => (
// 					<div
// 						key={index}
// 						onClick={() => {
// 							localStorage.setItem(
// 								Config.localStorageKeys.dept,
// 								dept.key as string,
// 							);
// 							navigate(`/staff-dashboard/${dept.path}?tab=assessments`);
// 						}}
// 						className={`flex flex-col h-full lg:w-[15%] lg:h-[60%] transition duration-300 transform bg-white rounded-lg lg:col-span-1 shadow-lg hover:shadow-xl hover:scale-105 hover:cursor-pointer
// 							${index === CoursesData.length - 1 ? 'col-span-2 justify-self-center w-[50%] md:col-start-2 md:col-end-4 md:justify-self-center md:row-start-2 lg:col-span-4 lg:row-start-1 md:ml-6 lg:ml-0' : ''}
// 							${index === 3 ? 'md:w-[50%] md:col-start-1 md:col-end-3 md:justify-self-center md:row-start-2 lg:col-start-4 lg:row-start-1' : ''}
// 							`}
// 					>
// 						<div className="w-full h-[80%] flex items-center justify-center rounded-t-lg">
// 							<p className="text-xl md:text-3xl font-semibold">{dept.Dept}</p>
// 						</div>
// 						<div className="w-full flex h-[20%] bg-btn-gradient items-center justify-center rounded-b-lg">
// 							<p className="text-xl text-white font-semibold">Select</p>
// 							{/* <button className="w-full h-full text-sm font-medium text-white rounded-b-lg sm:text-base md:text-lg lg:text-xl bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500">
// 								Select
// 							</button> */}
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };
// export default CoursesPage;
