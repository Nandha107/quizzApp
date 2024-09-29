import React from 'react';

interface ResultSubmittedPageProps {
	testName: string;
	submissionTime: any;
	onClick: () => void;
}

const ResultSubmittedPage: React.FC<ResultSubmittedPageProps> = ({ testName, onClick }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="  flex items-center w-full">
				<div className="w-[45%] px-5 h-full  items-center justify-center flex bg--400">
					<img src="https://i.ibb.co/XyqX4Jp/Completed-rafiki-1.png" />
				</div>
				<div className="w-[65%] flex gap-5 flex-col">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent ">
						Test Successfully Submitted
					</h1>
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
			<div className="bg-emerald-50 py-4 px-24 flex w-full justify-end">
				<button
					onClick={() => {
						onClick();
					}}
					className={`bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-2 px-9 rounded-lg `}
				>
					View Result
				</button>
			</div>
		</div>
	);
};

export default ResultSubmittedPage;
