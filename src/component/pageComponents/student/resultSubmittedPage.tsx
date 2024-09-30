import React from 'react';
import { PrimaryButton } from '../../buttons/primaryButton';
import { BackArrow } from '../../../assets/svg/backArrow';
import { useNavigate } from 'react-router-dom';

interface ResultSubmittedPageProps {
	testName: string;
	submissionTime: any;
	onClick: () => void;
}

const ResultSubmittedPage: React.FC<ResultSubmittedPageProps> = ({ testName, onClick }) => {
	const navigate = useNavigate();
	return (
		<div className="relative flex flex-col items-center justify-between h-full">
			<div
				className="absolute left-10 top-10 px-2 py-2 border border-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-300"
				onClick={() => navigate(-1)}
			>
				<BackArrow />
			</div>
			<div className="flex flex-col lg:flex-row items-center justify-center w-full h-full gap-5 lg:gap-0 py-5">
				<div className="w-[55%] md:w-[60%] lg:w-[45%] md:flex md:justify-center px-5">
					<img src="https://i.ibb.co/XyqX4Jp/Completed-rafiki-1.png" />
				</div>
				<div className="flex gap-5 flex-col text-center px-3 py-5">
					<p className="text-[1.6rem] md:text-4xl font-bold bg-text-gradient bg-clip-text text-transparent">
						Test Successfully Submitted
					</p>
					<p className="text-gray-600 text-lg ">
						Thank you for submitting your test. Your responses have been recorded.
					</p>
					<div className="">
						<p className="text-gray-800">
							<span className="font-bold text-lg">Test Name</span> :{' '}
							<span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent text-lg">
								{testName}
							</span>
						</p>
						<p className="text-gray-800">
							{/* <span className="font-bold text-lg">Submission Time</span> : <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent text-lg">{submissionTime}</span> */}
						</p>
					</div>
					<p className="text-gray-600 text-lg ">
						Your test has been successfully submitted, and you will receive the
						results shortly
					</p>
					<p className="text-gray-600 text-lg">
						Good luck, and thank you for your participation!
					</p>
				</div>
			</div>
			<div className="bg-teal-600/30 flex w-full py-2 px-5 justify-end">
				<PrimaryButton
					text="view Result"
					className="w-[40%] md:w-[30%] lg:w-[10%] md:h-[3rem] md:text-lg"
					onClick={() => {
						onClick();
					}}
				/>
				{/* <button
					onClick={() => {
						onClick();
					}}
					className={` text-white py-2 px-9 rounded-lg `}
				>
					View Result
				</button> */}
			</div>
		</div>
	);
};

export default ResultSubmittedPage;
