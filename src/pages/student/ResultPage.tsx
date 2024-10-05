import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfettiComponent from '../../component/pageComponents/student/ConfettiComponent';
import { useStudents } from '../../hooks/user/students/useStudents';
import { parseJwt } from '../../utils/parseJWT';
import SkeletonLoader from '../../component/pageComponents/student/resultPageSkeletonLosder';
import { Config } from '../../config';
const formatTime = (seconds: any) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
const ResultPage = () => {
	const { userMarksId } = useParams() as { userMarksId: string };
	const navigate = useNavigate();
	const [PassResult, setPassResult] = useState(false);

	const { useUserMarks } = useStudents();
	const token = localStorage.getItem(Config.localStorageKeys.access_token);
	let studentId;

	if (token) {
		const decodedToken = parseJwt(token);
		studentId = decodedToken.sub;
	}
	const Result = useUserMarks(userMarksId, studentId);
	const [isExpanded, setIsExpanded] = useState<{ [key: number]: boolean }>({}); // Track the expand state for each response

	// Function to toggle view more/less
	const toggleExpand = (index: number) => {
		setIsExpanded((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	if (Result.isLoading) {
		return <SkeletonLoader />;
	}
	if (PassResult) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				{Result.data?.pass ? <ConfettiComponent /> : null}
				<div className="flex flex-col h-[90%] items-center justify-center gap-3 p-16">
					<span>This is your approximate level for {Result.data?.testName}.</span>

					<span className="text-2xl font-bold ">Result</span>
					<span
						className={`text-3xl font-bold ${
							Result.data?.pass ? 'text-green-600' : 'text-[#FF3D00]'
						}`}
					>
						{Result.data?.pass ? 'PASS' : 'FAIL'}
					</span>
					<span className="text-xl font-bold">
						{Result.data?.pass ? (
							<img src="https://i.imghippo.com/files/P9UBo1727262425.png" />
						) : (
							<img src="https://i.ibb.co/cKBMD9H/OBJECTS.png" alt="OBJECTS" />
						)}
					</span>
				</div>
				<div className="flex justify-end w-full px-24 py-5 bg-emerald-50">
					<button
						onClick={() => {
							navigate('/student-dashboard?tab=assessments');
						}}
						className={`bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-2 px-9 rounded-lg `}
					>
						Done
					</button>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col w-full h-full bg-white ">
			<div className="w-full h-[90%] gap-2 p-8 md:flex md:gap-9">
				<div className="md:w-[60%]   w-full flex flex-col justify-center items-center ">
					<img
						src="https://i.imghippo.com/files/0ZriP1727259026.png"
						className="w-64 h-64"
						alt="Assessment"
					/>
					<div className="flex flex-col gap-3">
						<span className="justify-center w-full text-2xl font-bold text-center md:text-3xl">
							Assessment completed!
						</span>
						<span className="flex justify-between w-full text-sm md:text-base">
							<p>
								Given Time:{' '}
								{formatTime(Result.data?.givenTime?.overAllSeconds)}
							</p>
							<p>Taken Time: {formatTime(Result.data?.timeTaken)}</p>
						</span>
						<div className="p-5 border bg-emerald-50 text-start border-emerald-100 rounded-xl">
							SCORE : {Result.data?.overallPercentage}%
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex flex-col w-full h-full gap-5 p-5 overflow-y-auto">
					{Result.data?.levelScores.map((le: any, index: number) => (
						<div key={index} className="p-4 mb-4 border rounded-lg shadow-md">
							<h3 className="mb-2 text-lg font-semibold md:text-xl">
								{le.levelName}
							</h3>
							<span className="block text-sm text-gray-700 md:text-base">
								Level Score: <span className="font-bold">{le.score}</span>
							</span>
							<span className="block text-sm text-gray-700 md:text-base">
								Total Questions:{' '}
								<span className="font-bold">{le.totalQuestions}</span>
							</span>

							{le.responses.map((res: any, resIndex: number) => {
								const answerTooLong = res.selectedOption.length > 50;
								const correctAnswerTooLong = res.correctAnswer.length > 50;
								return (
									<div
										key={resIndex}
										className={`mt-2 p-3 sm:p-4 rounded-md ${
											res.isCorrect
												? 'bg-green-50 border border-green-200'
												: 'bg-red-50 border border-red-100'
										}`}
									>
										<span className="font-bold">
											Question {resIndex + 1}
										</span>
										Your Answer
										<span className="block text-sm text-[#64748B]">
											Your Answer:{' '}
											<span className="font-normal">
												{answerTooLong && !isExpanded[resIndex]
													? `${res.selectedOption.substring(0, 50)}...`
													: res.selectedOption || 'N/A'}
											</span>
											{answerTooLong && (
												<button
													className="ml-2 text-blue-500 underline"
													onClick={() => toggleExpand(resIndex)}
												>
													{isExpanded[resIndex]
														? 'View Less'
														: 'View More'}
												</button>
											)}
										</span>
										Correct Answer
										<span className="block text-sm text-[#009C35] mt-2">
											Correct Answer:{' '}
											<span className="font-bold">
												{correctAnswerTooLong && !isExpanded[resIndex]
													? `${res.correctAnswer.substring(0, 50)}...`
													: res.correctAnswer}
											</span>
											{correctAnswerTooLong && (
												<button
													className="ml-2 text-blue-500 underline"
													onClick={() => toggleExpand(resIndex)}
												>
													{isExpanded[resIndex]
														? 'View Less'
														: 'View More'}
												</button>
											)}
										</span>
									</div>
								);
							})}
						</div>
					))}
					<div className="flex w-full lg:hidden">
						{/* <PrimaryButton
							text="View Answer"
							className="w-full"
							onClick={() => setAnswerShow(true)}
						/> */}
					</div>
				</div>
				{/* <div className="flex mt-5 md:m-0 flex-col w-full overflow-y-auto h-[50vh] md:h-[70vh]">
					{Result.data?.levelScores.map((le: any, index: number) => (
						<div key={index} className="p-4 mb-4 border rounded-lg shadow-md">
							<h3 className="mb-2 text-lg font-semibold md:text-xl">
								{le.levelName}
							</h3>
							<span className="block text-sm text-gray-700 md:text-base">
								Level Score: <span className="font-bold">{le.score}</span>
							</span>
							<span className="block text-sm text-gray-700 md:text-base">
								Total Questions:{' '}
								<span className="font-bold">{le.totalQuestions}</span>
							</span>

							{le.responses.map((res: any, resIndex: number) => {
								const answerTooLong = res.selectedOption.length > 50;
								const correctAnswerTooLong = res.correctAnswer.length > 50;
								return (
									<div
										key={resIndex}
										className={`mt-2 p-3 sm:p-4 rounded-md ${
											res.isCorrect
												? 'bg-green-50 border border-green-200'
												: 'bg-red-50 border border-red-100'
										}`}
									>
										<span className="font-bold">
											Question {resIndex + 1}
										</span>

										Your Answer
										<span className="block text-sm text-[#64748B]">
											Your Answer:{' '}
											<span className="font-normal">
												{answerTooLong && !isExpanded[resIndex]
													? `${res.selectedOption.substring(0, 50)}...`
													: res.selectedOption || 'N/A'}
											</span>
											{answerTooLong && (
												<button
													className="ml-2 text-blue-500 underline"
													onClick={() => toggleExpand(resIndex)}
												>
													{isExpanded[resIndex]
														? 'View Less'
														: 'View More'}
												</button>
											)}
										</span>

										Correct Answer
										<span className="block text-sm text-[#009C35] mt-2">
											Correct Answer:{' '}
											<span className="font-bold">
												{correctAnswerTooLong && !isExpanded[resIndex]
													? `${res.correctAnswer.substring(0, 50)}...`
													: res.correctAnswer}
											</span>
											{correctAnswerTooLong && (
												<button
													className="ml-2 text-blue-500 underline"
													onClick={() => toggleExpand(resIndex)}
												>
													{isExpanded[resIndex]
														? 'View Less'
														: 'View More'}
												</button>
											)}
										</span>
									</div>
								);
							})}
						</div>
					))}
				</div> */}
			</div>

			{/* Footer or Bottom Section */}
			<div className="flex justify-end px-24 py-4 bg-emerald-50">
				<button
					onClick={() => {
						setPassResult(true);
					}}
					className={`bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-2 px-9 rounded-lg `}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default ResultPage;
