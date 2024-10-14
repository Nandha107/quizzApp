import React from 'react';
import { useStudents } from '../../../hooks/user/students/useStudents';
import { jwtDecode } from 'jwt-decode';
import { Config } from '../../../config';
import { Pie } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
} from 'chart.js';
import { user } from '../../../pages/student/dashboard';
import RankingList from './rankingList';

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
);

const StudentAnalyticPage: React.FC = () => {
	const token = localStorage.getItem(Config.localStorageKeys.access_token);
	let studentId;

	if (token) {
		const decodedToken: user = jwtDecode(token);
		studentId = decodedToken.sub as string;
	}

	const { studentDetails } = useStudents();
	const studentDetailsData = studentDetails({ studentId: studentId as string });

	// Pie chart data for pass/fail assessments
	const pieData = {
		labels: ['Pass', 'Fail'],
		datasets: [
			{
				label: 'Pass/Fail Assessments',
				data: [
					studentDetailsData?.data?.passedTests || 0,
					studentDetailsData?.data?.failedTests || 0,
				],
				backgroundColor: ['#2dd4bf', '#f87171'],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="flex flex-col w-full h-full gap-5 rounded-lg md:p-5 overflow-y-scroll overflow-x-clip">
			<div className="flex flex-col gap-3">
				<div className="w-full flex justify-between">
					<p className="text-lg md:text-xl lg:text-2xl font-semibold ">
						My Analytics
					</p>
				</div>

				{/* Statistics Grid */}
				<div className="lg:p-5 lg:bg-white rounded-lg lg:shadow-md grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.totalTests}
						</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Completed Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.totalTestsTaken}
						</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Incomplete Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.pendingTests}
						</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">My Rank</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.rank}
						</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Fail Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.failedTests}
						</p>
					</div>
					<div className="flex flex-col px-6 py-5 justify-center gap-3 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px]">
						<p className="text-base font-medium">Total Pass Assessments</p>
						<p className="text-3xl font-semibold text-teal-600">
							{studentDetailsData?.isLoading
								? '...'
								: studentDetailsData.data?.passedTests}
						</p>
					</div>
				</div>

				{/* Pie Chart for Pass/Fail */}
				<div className="border lg:bg-white rounded-lg lg:shadow-md flex w-full gap-5">
					<div className="w-full">
						<RankingList
							rankingList={studentDetailsData.data?.rankingList ?? []}
						/>
					</div>
					<div className="flex flex-col justify-center w-full">
						<p className="text-base font-medium text-center">Pass/Fail Overview</p>
						<div className="max-w-[400px] mx-auto">
							<Pie data={pieData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentAnalyticPage;
