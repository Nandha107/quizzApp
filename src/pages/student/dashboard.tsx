import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudents } from '../../hooks/user/students/useStudents';
// import { parseJwt } from '../../utils/parseJWT';
import { Config } from '../../config';
import { Badge, Segmented } from 'antd';
import { jwtDecode } from 'jwt-decode';
import Skeleton from 'react-loading-skeleton';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import StudentAnalyticPage from '../../component/pageComponents/student/studentReport';
import { convertMillisecondsToTimeOnly } from '../../utils/timeConverter';
import {
	FaArrowAltCircleRight,
	FaCheckCircle,
	FaClipboardList,
	FaHourglassHalf,
} from 'react-icons/fa';
// import { FaCalendar } from 'react-icons/fa';

export interface user {
	email: string;
	phoneNumber: string;
	department: string;
	name: string;
	sub: string;
	role: string;
	iat: number;
	exp: number;
}

type category = 'EEE' | 'MECH' | 'ECE' | 'CIVIL' | 'CSE';

type Align = 'assessment' | 'completed' | 'report';

const StudentDashboard = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem(Config.localStorageKeys.access_token);
	let studentId;
	let category;

	if (token) {
		const decodedToken: user = jwtDecode(token);
		studentId = decodedToken.sub as string;
		category = decodedToken.department;
	}

	const { tests, studentDetails } = useStudents();
	const Tests = tests({ studentId: studentId as string, category: category as category });

	const studentDetailsData = studentDetails({ studentId: studentId as string });
	// if (Tests.isLoading) return <div>Loading...</div>;
	// if (Tests.error) return <div>Error loading data</div>;

	const [searchParams, setSearchParams] = useSearchParams();

	const paramValue = searchParams.get('tab');

	const setTabParams = (value: string) => {
		const urls = ['?tab=assessments', '?tab=completed', '?tab=report'];
		urls.map((url: string) => {
			url.split('=')?.[1] === value ? setSearchParams(url) : null;
		});
	};

	return (
		<div className="relative flex flex-col w-full h-full gap-3 p-5">
			<div className="flex justify-between w-full">
				{/* Tabs */}
				<Segmented
					defaultValue="assessment"
					className="custom-segmented flex gap-5 w-full h-full justify-center items-center md:w-[70%] lg:w-[35%] border border-teal-600 p-1 bg-teal-600/20 text-md font-semibold"
					onChange={(value) => setTabParams(value as Align)}
					options={[
						{ label: 'Assessments', value: 'assessments' },
						// { label: 'Completed', value: 'completed' },
						{ label: 'Report', value: 'report' },
					]}
					value={paramValue}
				/>
			</div>

			{/* Content based on paramValue */}
			{paramValue === 'assessments' && (
				<div className="flex flex-col w-full h-[92%] rounded-xl border border-gray-300 relative">
					<div className="hidden px-3 py-5 lg:flex justify-between lg:items-center border-b border-gray-300">
						<p className="text-lg font-semibold lg:text-2xl ">Assessments</p>
						<div className="flex gap-5">
							{/* Total Assessments */}
							<p className="text-xl font-medium flex items-center gap-2">
								<FaClipboardList className="text-primary" />
								Total Assessments:
								<span className="text-primary font-bold">
									{studentDetailsData.isPending
										? '...'
										: studentDetailsData.data?.totalTests}
								</span>
							</p>

							{/* Completed Assessments */}
							<p className="text-xl font-medium flex items-center gap-2">
								<FaCheckCircle className="text-primary" />
								Completed Assessments:
								<span className="text-primary font-bold">
									{studentDetailsData.isPending
										? '...'
										: studentDetailsData.data?.totalTestsTaken}
								</span>
							</p>

							{/* Incomplete Assessments */}
							<p className="text-xl font-medium flex items-center gap-2">
								<FaHourglassHalf className="text-primary" />
								Incomplete Assessments:
								<span className="text-primary font-bold">
									{studentDetailsData.isPending
										? '...'
										: studentDetailsData.data?.pendingTests}
								</span>
							</p>
						</div>
					</div>
					<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 w-full overflow-y-scroll px-7 py-5 md:p-5">
						{Tests.isLoading || Tests.isFetching || Tests.isRefetching ? (
							[...Array(8)].map((_, index) => (
								<div
									key={index}
									className="relative min-h-[180px] max-h-[180px] md:min-h-[200px] md:max-h-[200px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
								>
									<Skeleton
										key={index}
										className="absolute -top-1 w-full h-full"
										baseColor="#4b55630C"
										style={{
											borderRadius: '0.8rem',
										}}
									/>
								</div>
							))
						) : !Tests.data?.length ? (
							<div className="absolute flex items-center justify-center w-full h-full z-[1000]">
								<p className=" text-gray-900">No tests available.</p>
							</div>
						) : (
							Tests.data?.map((test, index) => {
								const testTimeDuration = convertMillisecondsToTimeOnly(
									test.duration.overAllSeconds,
								);
								const startDate = new Date(test.startTime * 1000);
								const endDate = new Date(test.endTime * 1000);
								const createdAt = new Date(test.createdAt);
								const submittedAt = test.userMarks.length
									? new Date(test.userMarks?.[0]?.createdAt)
									: new Date(0);
								const monthNames = [
									'Jan',
									'Feb',
									'Mar',
									'Apr',
									'May',
									'Jun',
									'Jul',
									'Aug',
									'Sep',
									'Oct',
									'Nov',
									'Dec',
								];
								const formattedStartDate = `${startDate.getDate()} ${monthNames[startDate.getMonth()]}, ${startDate.getFullYear()}`;
								const formattedEndDate = `${endDate.getDate()} ${monthNames[endDate.getMonth()]}, ${endDate.getFullYear()}`;
								const formattedCreatedDate = `${createdAt.getDate()} ${monthNames[createdAt.getMonth()]}, ${createdAt.getFullYear()}`;
								const formattedSubmittedDate = `${submittedAt.getDate()} ${monthNames[submittedAt.getMonth()]}, ${submittedAt.getFullYear()}`;
								return (
									<div
										key={index}
										className="relative min-h-[190px] max-h-[190px] md:min-h-[200px] md:max-h-[200px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
									>
										<div className="flex flex-col py-3 w-full h-full bg-white border border-teal-600 rounded-lg shadow-md bg-gradient-to-br from-teal-600/50 via-teal-600/20 to-teal-600/50 hover:bg-teal-600/20">
											<div
												className={`px-4 ${test.completed ? 'h-full' : 'h-[75%]'} flex flex-col gap-2`}
											>
												<div className="bw-full flex flex-col">
													<div
														title={test.name}
														className="flex items-center w-full"
													>
														<p className="overflow-hidden text-lg font-semibold text-nowrap text-ellipsis">
															{test.name}
														</p>
													</div>
													{/* <p className="text-xs font-semibold text-[#64748B]">
														Total Students:{' '}
														{test.totalParticipants}
													</p> */}
												</div>
												<p className="text-xs font-semibold w-full flex gap-3 text-[#64748B] items-center">
													<span>Available in : </span>
													<span className="bg-white text-black py-2 px-2 rounded-lg">
														{formattedStartDate}
													</span>{' '}
													to{' '}
													<span className="bg-white text-black py-2 px-2 rounded-lg">
														{formattedEndDate}
													</span>
												</p>
												<div className="flex flex-col gap-1">
													<div className="flex justify-between items-center">
														<p className="text-xs font-semibold text-[#64748B]">
															Total Questions:{' '}
															{test.totalQuestions}
														</p>
														{test.completed ? (
															<p className="text-sm font-extrabold text-[#64748B]">
																Status:{' '}
																{test.pass ? (
																	<span className="text-green-600">
																		PASS
																	</span>
																) : (
																	<span className="text-error">
																		FAIL
																	</span>
																)}
															</p>
														) : null}
													</div>
													<div className="flex justify-between items-center">
														{test.timerForWholeTest ? (
															<p className="text-xs font-semibold text-[#64748B]">
																Total time: {testTimeDuration}
															</p>
														) : (
															<p className="text-xs font-semibold text-teal-700">
																Individual Question Timer
															</p>
														)}
														{test.completed ? (
															<p className="text-sm text-[#64748B] font-extrabold">
																Mark:{' '}
																<span
																	className={`${test.pass ? 'text-success' : 'text-error'}`}
																>
																	{test.totalMarksObtained}
																</span>
															</p>
														) : null}
													</div>
													<div className="flex flex-col gap-1">
														<p className="text-xs text-[#64748B] font-medium">
															Created Assessment :{' '}
															<span className="text-teal-950">
																{formattedCreatedDate}
															</span>
														</p>
														{test.completed ? (
															<p className="text-xs text-[#64748B] font-medium">
																Submitted Assessment :{' '}
																<span className="text-teal-950">
																	{formattedSubmittedDate}
																</span>
															</p>
														) : null}
													</div>
													{test.completed ? (
														<div
															className="flex items-center gap-2 px-4 py-2 shadow-md bg-btn-gradient rounded-lg border border-teal-700 absolute bottom-3 right-4 z-[1001] hover:cursor-pointer"
															onClick={() => {
																window.open(
																	`${Config.environment.APP_URL}/result/${test.userMarks?.[0].id}`,
																);
															}}
														>
															<p className="text-white text-sm">
																Results
															</p>
															<FaArrowAltCircleRight className="text-sm text-white" />
														</div>
													) : // <PrimaryButton
													// 	text="Show results"
													// 	className="absolute bottom-3 right-4 z-[1001]"
													// />
													null}
												</div>
												{/* <div className="flex flex-col gap-5 md:gap-8 w-full">
													<div className="flex justify-center items-center">
														<div className="w-[60%] flex flex-col">
															<div
																title={test.name}
																className="flex items-center w-full"
															>
																<p className="overflow-hidden text-lg font-semibold text-nowrap text-ellipsis">
																	{test.name}
																</p>
															</div>
															<p className="text-xs font-semibold text-[#64748B]">
																Total Students:{' '}
																{test.totalParticipants}
															</p>
														</div>
														<div className="w-[40%] justify-center flex py-2.5 items-center bg-white rounded-lg">
															<p className="text-sm font-semibold">
																{formattedDate}
															</p>
														</div>
													</div>
													<div className="flex flex-col gap-3 w-full border border-red-900">
														<div className="border border-red-900 flex justify-between items-center">
															<p className="text-xs font-semibold text-[#64748B]">
																Total Questions:{' '}
																{test.totalQuestions}
															</p>
															{test.completed ? (
																<p className="text-lg font-semibold text-[#64748B]">
																	Status:{' '}
																	{test.pass ? (
																		<span className="text-success">
																			PASS
																		</span>
																	) : (
																		<span className="text-error">
																			FAIL
																		</span>
																	)}
																</p>
															) : null}
														</div>
														<div className="flex justify-between items-center">
															<p className="text-xs font-semibold text-[#64748B]">
																Total time: {testTimeDuration}
															</p>
														</div>
													</div>
												</div> */}
											</div>
											{!test.completed ? (
												<div className="rounded-b-lg h-[25%] py-2 flex items-center justify-center">
													{/* {!test.completed ? <div className="rounded-b-lg py-1.5 md:py-3 lg:py-2.5 flex items-center justify-center cursor-pointer"> */}
													<PrimaryButton
														text={
															!test.enableResponseReceiving &&
															!test.completed
																? 'Upcoming Assessment'
																: test.enableResponseReceiving &&
																	  test.completed
																	? 'Completed Assessment'
																	: 'Start Assessment'
														}
														className="text-sm w-[70%]"
														onClick={() =>
															navigate(`/question/${test.id}`)
														}
													/>
												</div>
											) : null}
										</div>
										{!test.enableResponseReceiving && !test.completed ? (
											<div className="absolute bottom-0 bg-teal-900/50 w-full h-full z-100 rounded-lg">
												<Badge.Ribbon
													text="Up Coming"
													className="top-2 font-semibold text-black"
													color="yellow"
												></Badge.Ribbon>
											</div>
										) : null}
										{test.completed ? (
											<div className="absolute bottom-0 bg-teal-900/35 w-full h-full z-100 rounded-lg">
												<Badge.Ribbon
													text="Completed"
													className="top-2 font-semibold text-black"
													color="green"
												></Badge.Ribbon>
											</div>
										) : null}
									</div>
								);
							})
						)}
					</div>
				</div>
			)}
			{/* Content based on paramValue */}
			{paramValue === 'report' && (
				<div className="flex flex-col w-full h-[92%] rounded-xl border border-gray-300 relative">
					<div className="flex items-center justify-center w-full h-full">
						<StudentAnalyticPage />
					</div>
				</div>
			)}
		</div>
	);
};

export default StudentDashboard;
