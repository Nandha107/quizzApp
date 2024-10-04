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
				className="absolute px-2 py-2 border border-gray-500 rounded-lg left-10 top-10 hover:cursor-pointer hover:bg-gray-300"
				onClick={() => navigate(-1)}
			>
				<BackArrow />
			</div>
			<div className="flex flex-col items-center justify-center w-full h-full gap-5 py-5 lg:flex-row lg:gap-0">
				<div className="w-[55%] md:w-[60%] lg:w-[45%] md:flex md:justify-center px-5">
					<img src="https://i.ibb.co/XyqX4Jp/Completed-rafiki-1.png" />
				</div>
				<div className="flex flex-col gap-5 px-3 py-5 text-center">
					<p className="text-[1.6rem] md:text-4xl font-bold bg-text-gradient bg-clip-text text-transparent">
						Test Successfully Submitted
					</p>
					<p className="text-lg text-gray-600 ">
						Thank you for submitting your test. Your responses have been recorded.
					</p>
					<div className="">
						<p className="text-gray-800">
							<span className="text-lg font-bold">Test Name</span> :{' '}
							<span className="text-lg text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text">
								{testName}
							</span>
						</p>
						<p className="text-gray-800">
							{/* <span className="text-lg font-bold">Submission Time</span> : <span className="text-lg text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text">{submissionTime}</span> */}
						</p>
					</div>
					<p className="text-lg text-gray-600 ">
						Your test has been successfully submitted, and you will receive the
						results shortly
					</p>
					<p className="text-lg text-gray-600">
						Good luck, and thank you for your participation!
					</p>
				</div>
			</div>
			<div className="flex justify-end w-full px-5 py-2 bg-teal-600/30">
				<PrimaryButton
					text="view Result"
					className="w-[40%] md:w-[30%] lg:w-[20%] md:h-[3rem] md:text-lg"
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
