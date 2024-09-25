import { Segmented } from 'antd';
// import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAssessments } from '../../hooks/useAssessment';
import { FaEllipsisV } from 'react-icons/fa';
// import { Config } from '../../config';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import AnalyticPage from '../../component/pageComponents/admin/reportDepartment';

type Align = 'assessment' | 'completed' | 'report';

const StaffDashboard = () => {
	const { dept } = useParams<{ dept: string }>();

	const { getAllAssessments } = useAssessments({ course: dept!?.toUpperCase() });

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const paramValue = searchParams.get('tab');

	// const getDept = localStorage.getItem(Config.localStorageKeys.dept);

	const setTabParams = (value: string) => {
		// const urls = ['?tab=assessments', '?tab=completed', '?tab=report'];
		const urls = ['?tab=assessments', '?tab=report'];
		urls.map((url: string) => {
			url.split('=')?.[1] === value ? setSearchParams(url) : null;
		});
	};

	// const handleTestClick = (testId: string) => {
	// 	navigate(`/assessment-analytics/${testId}`);
	// };

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
						{getAllAssessments.isLoading ||
						getAllAssessments.isFetching ||
						getAllAssessments.isRefetching ? (
							[...Array(8)].map((_, index) => (
								<div
									key={index}
									className="relative min-h-[180px] max-h-[180px] md:min-h-[190px] md:max-h-[190px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
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

								// Format the date into human-readable form
								const humanReadableDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
								return (
									<div
										key={index}
										className="relative min-h-[180px] max-h-[180px] md:min-h-[190px] md:max-h-[190px] xl:min-h-[225px] xl:max-h-[225px] rounded-lg"
									>
										<div className="flex flex-col w-full h-full bg-white border border-teal-600 rounded-lg shadow-md bg-gradient-to-br from-teal-600/50 via-teal-600/20 to-teal-600/50 hover:bg-teal-600/20">
											{/* <div className="rounded-t-lg px-4 py-3 border border-red-900"> */}
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
															<div className="justify-center flex py-2 px-7 items-center bg-white rounded-lg">
																<p className="text-sm font-semibold">
																	{humanReadableDate}
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
			<div className="absolute md:hidden flex bottom-8 right-8 z-[1000]">
				<button
					className="w-16 h-16 flex gap-2 items-center justify-center text-xl font-medium text-white rounded-full bg-btn-gradient shadow-lg"
					onClick={() => {
						navigate(`/create-assessment`);
					}}
				>
					<span className="text-3xl">+</span>
				</button>
			</div>
		</div>
	);
};

export default StaffDashboard;

{
	/* <div className="grid p-5 2xl:gap-y-5 gap-5 row md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 md:px-5">
	{getAllAssessments.isLoading || getAllAssessments.isFetching
		? [...Array(106)].map((_, index) => (
				<div
					key={index}
					className="relative min-h-[179px] max-h-[180px] md:min-h-[239px] md:max-h-[240px] rounded-lg"
				>
					<Skeleton
						key={index}
						className="absolute w-full h-full"
						style={{
							borderRadius: '0.8rem',
						}}
					/>
				</div>
			))
		: getAllAssessments.data?.length
			? getAllAssessments.data.map((test) => {
					// Convert ISO string to Date object
					const date = new Date(test.createdAt);

					// Format the date into human-readable form
					const humanReadableDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;

					return (
						<div
							key={test.id}
							className="relative min-h-[179px] max-h-[180px] md:min-h-[239px] md:max-h-[240px] rounded-lg shadow-lg"
							onClick={() => handleTestClick(test.id)}
						>
							<div className="flex flex-col w-full h-full gap-3 p-4 bg-white border-2 border-teal-600 rounded-lg shadow-md cursor-pointer bg-gradient-to-br from-teal-600/50 via-teal-600/20 to-teal-600/50 hover:bg-teal-600/20">
								<div className="flex flex-col w-full h-[40%] md:h-[40%]">
									<div className="flex w-full h-full gap-3">
										<div
											title={test.name}
											className="flex items-center w-[70%]"
										>
											<p className="overflow-hidden text-lg font-bold md:text-xl text-nowrap text-ellipsis">
												{test.name}
											</p>
										</div>
										<div className="w-[30%] justify-center flex items-center bg-white rounded-lg">
											<p className="text-sm font-bold">
												{humanReadableDate}
											</p>
										</div>
									</div>
									<div className="">
										<p className="text-sm font-semibold text-teal-800">
											Total Students: {test.totalParticipants}
										</p>
									</div>
								</div>
								<div className="flex flex-col w-full h-[30%] md:h-[35%]">
									<div className=" h-[50%] flex items-center">
										<p className="overflow-hidden text-sm font-bold text-slate-900/60 text-nowrap text-ellipsis">
											Total time: {test.duration} seconds
										</p>
									</div>
									<div className="flex w-full gap-3 h-[50%]">
										<div className="flex items-center w-[50%]">
											<p className="overflow-hidden text-sm font-bold text-slate-900/60 text-nowrap text-ellipsis">
												Department: {test.category}
											</p>
										</div>
										<div className="text-sm font-bold text-slate-900/60 text-nowrap overflow-hidden text-ellipsis w-[50%] justify-center flex items-center">
											<p>Total Questions: {test.totalQuestions}</p>
										</div>
									</div>
								</div>
								<div className="flex h-[30%] md:h-[20%] justify-between">
									<button className="w-[70%] h-full flex gap-2 items-center justify-center text-lg font-medium text-white rounded-lg bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500">
										<span>Assessment Details</span>
									</button>
									<button className="w-[10%] h-full flex gap-2 items-center justify-center text-lg font-medium border border-teal-600 rounded-lg hover:bg-teal-600/20">
										<CgMoreVertical className="text-teal-600" />
									</button>
								</div>
							</div>
						</div>
					);
				})
			: null}
</div>; */
}
