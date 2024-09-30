import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfettiComponent from '../../component/pageComponents/student/ConfettiComponent';
import { useStudents } from '../../hooks/user/students/useStudents';
import { parseJwt } from '../../utils/parseJWT';
import SkeletonLoader from '../../component/pageComponents/student/resultPageSkeletonLosder';
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
	const token = localStorage.getItem('token');
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
			<div className="flex flex-col justify-center items-center ">
				{Result.data?.pass ? <ConfettiComponent /> : null}
				<div className="flex justify-center items-center flex-col gap-3 p-16">
					<span>This is your approximate level for {Result.data?.testName}.</span>

					<span className=" text-2xl font-bold">Result</span>
					<span
						className={`text-3xl font-bold ${
							Result.data?.pass ? 'text-green-600' : 'text-[#FF3D00]'
						}`}
					>
						{Result.data?.pass ? 'PASS' : 'FAIL'}
					</span>
					<span className="font-bold text-xl">
						{Result.data?.pass ? (
							<img src="https://i.imghippo.com/files/P9UBo1727262425.png" />
						) : (
							<img src="https://i.ibb.co/cKBMD9H/OBJECTS.png" alt="OBJECTS" />
						)}
					</span>
				</div>
				<div className="bg-emerald-50 w-full py-5 flex justify-end  px-24">
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
		<div className="w-full mx-auto bg-white">
			<div className="md:flex w-full gap-2  h-full md:gap-9 p-8">
				<div className="md:w-[60%]   w-full flex flex-col justify-center items-center ">
					<img
						src="https://i.imghippo.com/files/0ZriP1727259026.png"
						className="h-64 w-64"
						alt="Assessment"
					/>
					<div className="flex flex-col gap-3">
						<span className="font-bold text-2xl md:text-3xl w-full justify-center text-center">
							Assessment completed!
						</span>
						<span className="flex justify-between w-full text-sm md:text-base">
							<p>
								Given Time:{' '}
								{formatTime(Result.data?.givenTime?.overAllSeconds)}
							</p>
							<p>Taken Time: {formatTime(Result.data?.timeTaken)}</p>
						</span>
						<div className="bg-emerald-50 border text-start border-emerald-100 rounded-xl p-5">
							SCORE : {Result.data?.overallPercentage}%
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex mt-5 md:m-0 flex-col w-full overflow-y-auto h-[50vh] md:h-[70vh]">
					{Result.data?.levelScores.map((le: any, index: number) => (
						<div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
							<h3 className="text-lg md:text-xl font-semibold mb-2">
								{le.levelName}
							</h3>
							<span className="block text-gray-700 text-sm md:text-base">
								Level Score: <span className="font-bold">{le.score}</span>
							</span>
							<span className="block text-gray-700 text-sm md:text-base">
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

										{/* Your Answer */}
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

										{/* Correct Answer */}
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
				</div>
			</div>

			{/* Footer or Bottom Section */}
			<div className="bg-emerald-50 py-4 px-24 flex justify-end">
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
