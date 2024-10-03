import React, { useState } from 'react';
import SkeletonLoader from './resultPageSkeletonLosder';
import { PrimaryButton } from '../../buttons/primaryButton';

type Response = {
	question: {
		answer: string;
	};
	studentId: string;
	selectedOption: string;
	isCorrect: boolean;
	questionId: string;
};

type Level = {
	levelName: string;
	levelNo: number;
	Response: Response[];
};

type LevelsScorePageProps = {
	onClick: () => void;
	isLoading: boolean;
	score: number;
	totalQuestions: number;
	pass: boolean | null;
	percentage: number;
	level: Level;
};

// const formatTime = (seconds: number) => {
// 	const hours = Math.floor(seconds / 3600);
// 	const minutes = Math.floor((seconds % 3600) / 60);
// 	const secs = seconds % 60;

// 	return `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// };

const LevelsScorePage: React.FC<LevelsScorePageProps> = ({
	score,
	// totalQuestions,
	// pass,
	percentage,
	level,
	isLoading,
	onClick,
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean[]>([]);

	const [answerShow, setAnswerShow] = useState<boolean>(false);

	const toggleExpand = (index: number) => {
		setIsExpanded((prev) => {
			const newExpanded = [...prev];
			newExpanded[index] = !newExpanded[index];
			return newExpanded;
		});
	};
	if (isLoading) {
		return <SkeletonLoader />;
	}
	return (
		<div className="w-full h-full bg-white">
			<div
				className={`${answerShow ? 'hidden' : ''} lg:flex w-full gap-2 h-full lg:h-[90%] md:gap-9 p-8 border border-green-900`}
			>
				<div className="md:w-[60%] w-full flex flex-col justify-center items-center ">
					<img
						src="https://i.imghippo.com/files/0ZriP1727259026.png"
						className="h-64 w-64"
						alt="Assessment"
					/>
					<div className="flex flex-col gap-3">
						<span className="font-bold text-2xl md:text-3xl w-full justify-center text-center">
							Assessment completed!
						</span>
						{/* <span className="flex justify-between w-full text-sm md:text-base">
							<p>Given Time: {(givenTime)}</p>
							<p>Taken Time: {(timeTaken)}</p>
							</span> */}
						<div className="bg-teal-600/30 border text-start border-teal-600/30 rounded-xl p-5">
							SCORE: {percentage}%
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className=" justify-center flex mt-5 md:m-0 flex-col w-full overflow-y-auto">
					<div className="mb-4 p-4 border rounded-lg shadow-md">
						<h3 className="text-lg md:text-xl font-semibold mb-2">
							{level.levelName}
						</h3>
						<span className="block text-gray-700 text-sm md:text-base">
							Level Score: <span className="font-bold">{score}</span>
						</span>

						{level.Response.map((res, resIndex) => {
							const answerTooLong = res.selectedOption.length > 50;
							const correctAnswerTooLong = res.question.answer.length > 50;
							return (
								<div
									key={resIndex}
									className={`mt-2 hidden lg:flex p-3 sm:p-4 rounded-md ${
										res.isCorrect
											? 'bg-green-50 border border-green-200'
											: 'bg-red-50 border border-red-100'
									}`}
								>
									<span className="font-bold">Question {resIndex + 1}</span>

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

									<span className="block text-sm text-[#009C35] mt-2">
										Correct Answer:{' '}
										<span className="font-bold">
											{correctAnswerTooLong && !isExpanded[resIndex]
												? `${res.question.answer.substring(0, 50)}...`
												: res.question.answer}
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
					<div className="flex lg:hidden border border-red-900 w-full">
						<PrimaryButton
							text="View Answer"
							className="w-full"
							onClick={() => setAnswerShow(true)}
						/>
					</div>
				</div>
			</div>
			{answerShow ? (
				<div className="lg:hidden flex h-full flex-col gap-5 justify-center items-center">
					<p className="text-lg font-bold">Answer Board</p>
					<div className="w-full p-5 text-center">
						{level.Response.map((res, resIndex) => {
							const answerTooLong = res.selectedOption.length > 50;
							const correctAnswerTooLong = res.question.answer.length > 50;
							return (
								<div
									key={resIndex}
									className={`mt-2 lg:flex p-3 sm:p-4 rounded-md ${
										res.isCorrect
											? 'bg-green-50 border border-green-200'
											: 'bg-red-50 border border-red-100'
									}`}
								>
									<span className="font-bold">Question {resIndex + 1}</span>

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

									<span className="block text-sm text-[#009C35] mt-2">
										Correct Answer:{' '}
										<span className="font-bold">
											{correctAnswerTooLong && !isExpanded[resIndex]
												? `${res.question.answer.substring(0, 50)}...`
												: res.question.answer}
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
					<div className="w-full flex justify-end px-5">
						<PrimaryButton text="Next Level" onClick={onClick} />
					</div>
				</div>
			) : null}

			{/* Footer or Bottom Section */}
			<div className="bg-emerald-50 h-[10%] hidden px-5 lg:flex items-center justify-end border-2 border-red-900">
				<PrimaryButton text="Next Level" onClick={onClick} />
			</div>
		</div>
	);
};

export default LevelsScorePage;
