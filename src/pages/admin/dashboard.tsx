import { Segmented } from 'antd';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAssessments } from '../../hooks/useAssessment';
import { FaCalendar, FaEllipsisV } from 'react-icons/fa';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import AnalyticPage from '../../component/pageComponents/admin/reportDepartment';

type Align = 'assessment' | 'completed' | 'report';

const StaffDashboard = () => {
	const { dept } = useParams<{ dept: string }>();

	const { getAllAssessments } = useAssessments({ course: dept!?.toUpperCase() });

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const paramValue = searchParams.get('tab');

	const setTabParams = (value: string) => {
		// const urls = ['?tab=assessments', '?tab=completed', '?tab=report'];
		const urls = ['?tab=assessments', '?tab=report'];
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
				<div className="flex flex-col w-full h-[92%] rounded-xl md:border md:border-gray-300 relative">
					<div className="hidden px-3 py-5 lg:flex lg:items-center border-b border-gray-300">
						<p className="text-lg font-semibold lg:text-2xl ">Assessments</p>
					</div>
					<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 w-full overflow-y-scroll py-5 md:p-5">
						{getAllAssessments.isLoading ||
						getAllAssessments.isFetching ||
						getAllAssessments.isRefetching ? (
							[...Array(8)].map((_, index) => (
								<div
									key={index}
									className="relative min-h-[190px] max-h-[190px] md:min-h-[200px] md:max-h-[200px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
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
						) : !getAllAssessments.data?.length ? (
							<div className="absolute flex items-center justify-center w-full h-full z-[1000]">
								<p className=" text-gray-900">No tests available.</p>
							</div>
						) : (
							getAllAssessments.data.map((assessment, index) => {
								// Convert ISO string to Date object
								const date = new Date(assessment.createdAt);
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

								// Format the date into human-readable form
								const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
								// const humanReadableDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
								return (
									<div
										key={index}
										className="relative min-h-[190px] max-h-[190px] md:min-h-[200px] md:max-h-[200px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
									>
										<div className="flex flex-col w-full h-full bg-white border border-teal-600 rounded-lg shadow-md bg-gradient-to-br from-teal-600/50 via-teal-600/20 to-teal-600/50 hover:bg-teal-600/20">
											<div className="rounded-t-lg px-4 py-3 border-b border-gray-400/30">
												<div className="flex flex-col gap-5 md:gap-8 w-full">
													<div className="flex flex-col">
														<div className="w-full flex justify-between">
															<div
																title={assessment.name}
																className="flex items-center w-[80%]"
															>
																<p className="overflow-hidden text-lg font-semibold text-nowrap text-ellipsis">
																	{assessment.name}
																</p>
															</div>
															<div className="border border-primary p-2 rounded-md cursor-pointer">
																<FaEllipsisV className="text-teal-600" />
															</div>
														</div>
														<p className="text-xs font-semibold text-[#64748B]">
															Total Students:{' '}
															{assessment.totalParticipants}
														</p>
													</div>
													<div className="flex flex-col w-full">
														<p className="text-xs font-semibold text-[#64748B]">
															Total Questions:{' '}
															{assessment.totalQuestions}
														</p>
														<div className="flex justify-between items-center">
															<p className="text-xs font-semibold text-[#64748B]">
																Total time:{' '}
																{
																	assessment.duration
																		.overAllSeconds
																}{' '}
																seconds
															</p>
															<div className="justify-center gap-2 flex py-2 px-5 items-center bg-white rounded-lg">
																<FaCalendar/>
																<p className="text-sm font-semibold">
																	{formattedDate}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="rounded-b-lg py-1.5 md:py-3 lg:py-2.5 flex items-center justify-center cursor-pointer">
												<PrimaryButton
													text="Assessment Details"
													className="text-sm w-[70%]"
													onClick={() =>
														navigate(
															`/assessment-analytics/${assessment.id}`,
														)
													}
												/>
											</div>
										</div>
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
						{/* <AnalyticPage /> */}
						<AnalyticPage department={dept as string} />
					</div>
				</div>
			)}
			<div className="absolute md:hidden flex bottom-20 right-8 z-[1000]">
				<button
					className="w-16 h-16 flex gap-2 items-center justify-center text-xl font-medium text-white rounded-full bg-btn-gradient shadow-lg"
					onClick={() => {
						navigate(`/create-assessment/${dept}`);
					}}
				>
					<span className="text-3xl">+</span>
				</button>
			</div>
		</div>
	);
};

export default StaffDashboard;
