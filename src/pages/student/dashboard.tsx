import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudents } from '../../hooks/user/students/useStudents';
import { parseJwt } from '../../utils/parseJWT';
import { Config } from '../../config';
import { Segmented } from 'antd';
import { jwtDecode } from 'jwt-decode';
import Skeleton from 'react-loading-skeleton';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { FaCalendar } from 'react-icons/fa';

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

	const { tests } = useStudents();
	const Tests = tests({ studentId: studentId as string, category: category as category });
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
			<div className="w-full">
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
					<div className="hidden px-3 py-5 lg:flex lg:items-center border-b border-gray-300">
						<p className="text-lg font-semibold lg:text-2xl ">Assessments</p>
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
								const date = new Date(test.createdAt);
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
								const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
								return (
									<div
										key={index}
										className="relative min-h-[180px] max-h-[180px] md:min-h-[200px] md:max-h-[200px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
									>
										<div className="flex flex-col w-full h-full bg-white border border-teal-600 rounded-lg shadow-md bg-gradient-to-br from-teal-600/50 via-teal-600/20 to-teal-600/50 hover:bg-teal-600/20">
											<div className="rounded-t-lg px-4 py-3 border-b border-gray-400/30">
												<div className="flex flex-col gap-5 md:gap-8 w-full">
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
													<div className="flex flex-col gap-3 w-full">
														<p className="text-xs font-semibold text-[#64748B]">
															Total Questions:{' '}
															{test.totalQuestions}
														</p>
														<div className="flex justify-between items-center">
															<p className="text-xs font-semibold text-[#64748B]">
																Total time:{' '}
																{test.duration.overAllSeconds}{' '}
																seconds
															</p>
														</div>
													</div>
												</div>
											</div>
											<div className="rounded-b-lg py-1.5 md:py-3 lg:py-2.5 flex items-center justify-center cursor-pointer">
												<PrimaryButton
													text="Complete Assessment"
													className="text-sm w-[70%]"
													onClick={() =>
														navigate(`/question/${test.id}`)
													}
												/>
											</div>
										</div>
										{/* <div className="flex justify-between items-center mb-4">
										<h2 className="text-lg font-medium text-gray-900">
											{test.name}
										</h2>
										<span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 inline-block mr-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 7V6a2 2 0 114 0v1a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 114 0v1m-6 3C4 17 7 21 11 21h2c4 0 7-4 7-9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v5z"
												/>
											</svg>
											{new Date(test.createdAt).toDateString()}
										</span>
									</div>
									<div className="text-gray-700">
										<p className="mb-2">
											<span className="font-medium">Total time:</span>{' '}
											{test.duration.hours} seconds
										</p>
										<p className="mb-2">
											<span className="font-medium">Department:</span>{' '}
											{test.category}
										</p>
										<p className="mb-4">
											<span className="font-medium">
												Total questions:
											</span>{' '}
											{test.totalQuestions}
										</p>
									</div>
									<button
										onClick={() => navigate(`/question/${test.id}`)}
										className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md"
									>
										Complete test
									</button> */}
									</div>
								);
							})
						)}
					</div>
				</div>
			)}
			{/* Content based on paramValue */}
			{/* {paramValue === 'report' && (
				<div className="flex flex-col w-full h-[92%] rounded-xl border border-gray-300 relative">
					<div className="flex items-center justify-center w-full h-full">
						<AnalyticPage department={dept as string} />
					</div>
				</div>
			)} */}
			{/* <div className="absolute md:hidden flex bottom-8 right-8 z-[1000]">
				<button
					className="w-16 h-16 flex gap-2 items-center justify-center text-xl font-medium text-white rounded-full bg-btn-gradient shadow-lg"
					onClick={() => {
						navigate(`/staff-dashboard/${dept}/create-assessment`);
					}}
				>
					<span className="text-3xl">+</span>
				</button>
			</div> */}
		</div>
	);
};

export default StudentDashboard;
