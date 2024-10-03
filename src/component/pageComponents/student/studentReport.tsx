import React from 'react';

// interface Props {
// 	department: string;
// }

const StudentAnalyticPage: React.FC = () => {
	return (
		<div className="flex flex-col w-full h-full gap-5 rounded-lg md:p-5 overflow-y-scroll overflow-x-clip">
			<div className="flex flex-col gap-3">
				<div className="w-full flex justify-between">
					<p className="text-lg md:text-xl lg:text-2xl font-semibold ">
						My Analytics
					</p>
				</div>
				<div className="lg:p-5 lg:bg-white rounded-lg lg:shadow-md grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Completed Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Incomplete Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">My Rank</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Fail Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Pass Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3"></div>
		</div>
	);
};

export default StudentAnalyticPage;
