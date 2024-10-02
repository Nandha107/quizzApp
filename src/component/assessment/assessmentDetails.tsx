import { useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Skeleton from 'react-loading-skeleton';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart, Doughnut } from 'react-chartjs-2';
import { useAssessments } from '../../hooks/useAssessment';
import { BackArrow } from '../../assets/svg/backArrow';
import { PrimaryButton } from '../buttons/primaryButton';
import { FaFileExport } from 'react-icons/fa';
import { Config } from '../../config';

const AssessmentDetails = () => {
	// Register the chart elements with Chart.js
	ChartJS.register(ArcElement, Tooltip, Legend);

	const navigate = useNavigate();

	const { assessmentId } = useParams();

	const getDept = localStorage.getItem(Config.localStorageKeys.dept);

	const { getAssessmentAnalytics } = useAssessments({
		assessmentId,
		course: getDept as string,
	});

	const exportToExcel = () => {
		console.log();

		const exportData = getAssessmentAnalytics.data?.studentAnalytics?.map(
			(student: Assessments.StudentDetails) => ({
				StudentName: student.name,
				StudentEmail: student.email,
				TotalMarks: student.totalMarks,
				PassStatus: student.pass ? 'Pass' : 'Fail',
				CorrectAnswers: student.correctAnswers,
				WrongAnswers: student.wrongAnswers,
			}),
		);

		const worksheet = XLSX.utils.json_to_sheet(exportData as any);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Analytics');

		XLSX.writeFile(
			workbook,
			`${getAssessmentAnalytics.data?.testName}_${assessmentId}.xlsx`,
		);
	};

	const pieData = {
		labels: ['Correct Answers', 'Wrong Answers'],
		datasets: [
			{
				label: 'Performance',
				data: [
					getAssessmentAnalytics.data?.totalCorrectAnswers,
					getAssessmentAnalytics.data?.totalWrongAnswer,
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
		<div className="relative flex flex-col w-full h-full">
			<div className="h-[10%] hidden lg:flex px-5 py-3">
				<div className=" w-[80%] flex items-center gap-4">
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
			<div className="relative overflow-y-auto lg:h-[90%] p-5 md:py-10 lg:py-5 flex flex-col gap-y-5">
				<div className="hidden lg:flex">
					<p className="text-lg font-bold">
						Assessment Name :{' '}
						<span className="text-transparent bg-text-gradient bg-clip-text">
							{getAssessmentAnalytics.data
								? getAssessmentAnalytics.data?.testName
								: 'Loading...'}
						</span>
					</p>
				</div>
				<div className="grid w-full grid-cols-2 gap-y-5 2xl:gap-y-16 gap-x-5 row md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6">
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
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">Total Levels</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.levels}
										</p>
									</div>
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">Total Questions</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalQuestions}
										</p>
									</div>
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">
											Total Correct Answers
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalCorrectAnswers}
										</p>
									</div>
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">
											Total Wrong Answers
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.totalWrongAnswer}
										</p>
									</div>
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">
											Total Passed Students
										</p>
										<p className="text-3xl font-semibold text-teal-600">
											{getAssessmentAnalytics.data?.passCount}
										</p>
									</div>
									<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
										<p className="text-sm font-medium">
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
				<div className="flex flex-col gap-5 md:flex-row">
					<div className="w-full md:w-[50%] rounded-lg bg-white shadow-md">
						<div className="flex flex-col items-center w-full gap-3 p-5 border rounded-lg">
							<p className="text-xl font-semibold text-slate-500">
								Overall Performance
							</p>
							<div className="flex items-center justify-center w-full border min-h-[400px] max-h-[400px]">
								{getAssessmentAnalytics.isLoading ||
								getAssessmentAnalytics.isFetching ||
								getAssessmentAnalytics.isRefetching ? (
									<div className="relative w-full">
										<Skeleton className="min-h-[400px] max-h-[400px] absolute -top-1" />
									</div>
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
									<div className="relative w-full">
										<Skeleton className="min-h-[400px] max-h-[400px] absolute -top-1" />
									</div>
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
			<div className="absolute lg:hidden flex bottom-20 right-8 z-[1000]">
				<button
					className="flex items-center justify-center w-20 h-20 gap-2 text-xl font-medium text-white rounded-full shadow-lg bg-btn-gradient"
					onClick={exportToExcel}
				>
					<span className="text-3xl">
						<FaFileExport />
					</span>
				</button>
			</div>
			{/* <div className="absolute bottom-0 z-1000 flex lg:hidden shrink-0 h-[10%] bg-teal-600/30 items-center justify-center border border-red-900">
				<button
					className="w-[60%] py-3 md:w-[50%] md:py-5 text-md font-medium text-white rounded-md bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500"
					onClick={exportToExcel}
				>
					Export to Excel
				</button>
			</div> */}
		</div>
	);
};
export default AssessmentDetails;
