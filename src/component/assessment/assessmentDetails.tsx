// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { BackArrowIcon } from '../../assets/svg/common/backArrow';
import Skeleton from 'react-loading-skeleton';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart, Doughnut } from 'react-chartjs-2';
import { useAssessments } from '../../hooks/useAssessment';
import { BackArrow } from '../../assets/svg/backArrow';
import { PrimaryButton } from '../buttons/primaryButton';

const AssessmentDetails = () => {
	// Register the chart elements with Chart.js
	ChartJS.register(ArcElement, Tooltip, Legend);

	const navigate = useNavigate();

	const { assessmentId } = useParams();

	const { getAssessmentAnalytics } = useAssessments({ assessmentId });

	// const exportToExcel = () => {

	// 	console.log();

	// 	const exportData = responses?.map((response: any) => ({
	// 		StudentName: response.user.name,
	// 		StudentEmail: response.user.email,
	// 		TotalMarks: response.marks,
	// 		PassStatus: response.pass ? 'Pass' : 'Fail',
	// 		CorrectAnswers:
	// 			response.selectedOption ===
	// 			response.test.questions.find((q: any) => q.id === response.questionId).answer
	// 				? 1
	// 				: 0,
	// 		WrongAnswers:
	// 			response.selectedOption !==
	// 			response.test.questions.find((q: any) => q.id === response.questionId).answer
	// 				? 1
	// 				: 0,
	// 	}));

	// 	const worksheet = XLSX.utils.json_to_sheet(exportData);
	// 	const workbook = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Analytics');

	// 	XLSX.writeFile(workbook, `${responses[0].test.name}_${assessmentId}.xlsx`);
	// };

	const pieData = {
		labels: ['Correct Answers', 'Wrong Answers'],
		datasets: [
			{
				label: 'Performance',
				data: [
					getAssessmentAnalytics.data?.totalCorrectAnswers,
					getAssessmentAnalytics.data?.totalWrongAnswers,
				],
				backgroundColor: ['#0d9488', '#0d94884d'],
			},
		],
	};

	const barData = {
		labels: ['Passed Students', 'Failed Students'],
		datasets: [
			{
				label: 'Students',
				data: [
					getAssessmentAnalytics.data?.passCount,
					getAssessmentAnalytics.data?.failCount,
				],
				backgroundColor: ['#0d9488', '#0d94884d'],
			},
		],
	};

	return (
		<div className="w-full h-full flex flex-col">
			<div className="h-[10%] hidden lg:flex px-5 py-3">
				<div className=" w-[80%] flex items-center gap-2">
					<div
						className="px-2 py-2 border border-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-300"
						onClick={() => navigate(-1)}
					>
						<BackArrow />
					</div>
					<p className="text-2xl font-bold">Analytics</p>
				</div>
				<div className="w-[20%] flex justify-end items-center">
					<PrimaryButton text="Export to Excel" onClick={() => {}} />
				</div>
			</div>
			<div className="relative overflow-y-auto h-[90%] p-5 md:py-10 lg:py-5 space-y-10">
				<div className="grid gap-y-5 2xl:gap-y-16 gap-x-5 row grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 w-full">
					{getAssessmentAnalytics.isLoading ||
					getAssessmentAnalytics.isFetching ||
					getAssessmentAnalytics.isRefetching ? (
						Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className="rounded-lg shadow-md bg-gradient-to-br from-gray-600/20 via-gray-600/10 to-gray-600/20 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5"
							>
								<Skeleton className="w-[90%]" />
								<Skeleton className="w-[40%]" />
							</div>
						))
					) : (
						<>
							{getAssessmentAnalytics.isSuccess &&
							getAssessmentAnalytics.data?.testId ? (
								<>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">Total Levels</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.levels}
										</p>
									</div>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">
											Total Questions
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalQuestions}
										</p>
									</div>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">
											Total Correct Answers
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalCorrectAnswers}
										</p>
									</div>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">
											Total Wrong Answers
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalWrongAnswers}
										</p>
									</div>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">
											Total Passed Students
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.passCount}
										</p>
									</div>
									<div className="flex flex-col px-6 py-5 justify-center gap-3 rounded-lg shadow-md border border-teal-600 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 relative min-h-[69px] max-h-[70px] md:min-h-[99px] md:max-h-[100px] p-5">
										<p className="text-base font-semibold">
											Total Failed Students
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.failCount}
										</p>
									</div>
								</>
							) : (
								<></>
							)}
						</>
					)}
				</div>
				<div className="flex flex-col md:flex-row gap-5">
					<div className="w-full md:w-[50%] rounded-lg bg-white shadow-md">
						<div className="flex flex-col items-center w-full gap-3 p-5 border rounded-lg">
							<p className="text-xl font-semibold text-slate-500">
								Overall Performance
							</p>
							<div className="flex items-center justify-center w-full border min-h-[400px] max-h-[400px]">
								{getAssessmentAnalytics.isLoading ||
								getAssessmentAnalytics.isFetching ||
								getAssessmentAnalytics.isRefetching ? (
									<Skeleton height={300} />
								) : getAssessmentAnalytics.data?.testId ? (
									<PieChart data={pieData} />
								) : (
									<div className="border border-red-900">
										<p>No Data Found...</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="w-full md:w-[50%] rounded-lg bg-white shadow-md">
						<div className="flex flex-col items-center w-full gap-3 p-5 border rounded-lg">
							<p className="text-xl font-semibold text-slate-500">
								Students Ratio (PASS / FAIL)
							</p>
							<div className="flex items-center justify-center w-full border min-h-[400px] max-h-[400px]">
								{getAssessmentAnalytics.isLoading ||
								getAssessmentAnalytics.isFetching ||
								getAssessmentAnalytics.isRefetching ? (
									<Skeleton height={300} />
								) : getAssessmentAnalytics.data?.testId ? (
									<Doughnut data={barData} />
								) : (
									<div className="border border-red-900">
										<p>No Data Found...</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex lg:hidden shrink-0 w-full h-[10%] bg-teal-600/30 items-center justify-center">
				<button
					className="w-[60%] py-3 md:w-[50%] md:py-5 text-md font-medium text-white rounded-md bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500"
					// onClick={exportToExcel}
				>
					Export to Excel
				</button>
			</div>
		</div>
	);
};
export default AssessmentDetails;
