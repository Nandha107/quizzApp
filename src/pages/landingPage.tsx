import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen absolute w-full flex flex-col">
			<div className="sphere"></div>
			<div className="sphere"></div>
			<div className="sphere"></div>

			{/* Header */}
			<header className="text-black py-3 border-b px-4 md:px-8 flex bg-white justify-between items-center sticky top-0 z-40">
				<div className="text-lg md:text-xl font-bold flex justify-center">
					Assessment
				</div>
				<div className="flex justify-center">
					<button
						onClick={() => navigate('/login-types')}
						className="bg-white text-teal-600 m-plus-rounded-1c-thin tracking-[0.2em] font-semibold border-teal-500 border py-2 px-4 md:px-6 mr-2 md:mr-4 transition hover:scale-105"
					>
						Login
					</button>
					<button
						onClick={() => navigate('/student-signup')}
						className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white m-plus-rounded-1c-thin tracking-[0.2em] font-semibold py-2 px-4 md:px-6 border border-teal-500 transition hover:scale-105"
					>
						Sign Up
					</button>
				</div>
			</header>
			{/* <div className="h-[1px] w-full ml-20 bg-gray-300 absolute bottom-[65px] border-4 border-red-900 p-5"></div> */}

			{/* Main Content */}
			<div className="min-h-[88vh] border-b border-gradient-to-r from-teal-800 to-teal-800 relative flex flex-col lg:flex-row">
				{/* <div className="min-h-[88vh] border-b border-gradient-to-r from-emerald-100 to-emerald-50 relative flex flex-col lg:flex-row"> */}
				{/* Left Section */}
				<div className="h-[279vh] w-[1px] ml-20 bg-gray-300 absolute -top-0"></div>
				<div className="h-[88vh] w-[1px] ml-20 bg-gray-200 absolute left-48 "></div>
				<div className="h-[279vh] w-[1px] ml-20 bg-gray-300 absolute right-12"></div>
				<div className="h-[10vh] w-[1px] ml-20 bg-emerald-500 absolute -left-10 top-20"></div>

				<div className="bg-gradient-to-r from-teal-600/40 to-teal-600/20 w-full rounded-tr-[150px] lg:rounded-tr-[407px] lg:w-[80%] flex flex-col justify-center pl-6 md:pl-12 lg:pl-28 py-8 lg:py-0">
					{/* <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 w-full rounded-tr-[150px] lg:rounded-tr-[407px] lg:w-[70%] flex flex-col justify-center pl-6 md:pl-12 lg:pl-28 py-8 lg:py-0"> */}
					<div className="w-[80%] lg:w-[63%]">
						<h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 to-teal-500 bg-clip-text text-transparent mb-4">
							Welcome to Assessment
						</h1>
						<p className="text-black mb-6 m-plus-rounded-1c-thin text-lg tracking-[0.2em] md:text-base">
							The ultimate platform for creating, taking, and analyzing quizzes.
							Whether you're a student or a teacher, we've got the tools you need
							to succeed.
						</p>
						<button
							onClick={() => navigate('/student-signup')}
							className="bg-gradient-to-r absolute z-50 transition hover:scale-105 cursor-pointer from-emerald-500 to-emerald-900 text-white px-6 py-2"
						>
							Get Started <i className="fas fa-arrow-right ml-2"></i>
						</button>
					</div>

					{/* Background Overlay */}
					<div
						className="absolute top-0 left-0 w-full h-full opacity-50"
						style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
					></div>
				</div>

				{/* Right Section (Overlapping Boxes) */}
				<div className="lg:absolute top-[60px] right-0 lg:right-[780px]">
					<div className="bg-orange-300 relative w-full lg:w-[100%]">
						<div className="h-[40vh] lg:h-[70vh] w-[50vw] lg:w-[735px] rounded-bl-[100px] lg:rounded-bl-[200px] border border-gray-300 absolute z-10 top-7 left-4 lg:left-12 flex items-center justify-center text-white text-base font-medium">
							z-10
						</div>
						<div className="h-[40vh] lg:h-[70vh] w-[90vw] lg:w-[700px] rounded-bl-[200px] lg:rounded-bl-[200px] border absolute z-20 top-0 left-8 lg:left-20 flex items-center justify-center text-white text-base font-medium animate-slide-in">
							<div className="relative overflow-hidden rounded-bl-[100px] lg:rounded-bl-[180px] h-[40vh] lg:h-[70vh] w-[90vw] lg:w-[700px]">
								<img
									src="https://storage.googleapis.com/a1aa/image/ukoFQUTyseShTiNgXvHVxEeOUYhH8PINiGZnKH8DCc4PlrfmA.jpg"
									alt="Students taking a quiz in a classroom"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Why Choose Assessment Section */}
			<div className="p-6 md:p-24 w-full">
				<h1 className="text-4xl m-plus-rounded-1c-thin mb-6 tracking-[0.2em] text-center">
					Why Choose Assessment?
				</h1>

				<div className="flex flex-col md:flex-row items-center">
					<div className="p-3 bg-gradient-to-r from-slate-100 to-emerald-50 rounded-md shadow-[0_6px_9px_rgba(0,0,0,0.1)]">
						<img
							alt="Colorful sticky notes and pens on a purple background"
							className="w-[400px] h-[300px] rounded-lg"
							src="https://i.imghippo.com/files/370a21727083434.png"
						/>
					</div>

					<div className="ml-0 md:ml-6 m-plus-rounded-1c-thin text-center md:text-left">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-500 bg-clip-text text-transparent mb-2">
							Create Quizzes Easily
						</h2>
						<p className="text-gray-700 text-lg m-plus-rounded-1c-thin mb-6 tracking-[0.2em]">
							Teachers can create quizzes with multiple question types and set
							timers for better control.
						</p>
					</div>
				</div>
			</div>

			{/* Another Feature Section */}
			<div className="p-6 md:p-24 w-full">
				<div className="flex flex-col md:flex-row items-center">
					<div className="ml-0 md:ml-6 m-plus-rounded-1c-thin text-center md:text-left">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-500 bg-clip-text text-transparent mb-2">
							Analyze Results{' '}
						</h2>
						<p className="text-gray-700 text-lg m-plus-rounded-1c-thin mb-6 tracking-[0.2em]">
							View detailed analytics for each test to track progress and
							improve.{' '}
						</p>
					</div>
					<div className="p-3 bg-gradient-to-r from-slate-100 to-emerald-50 rounded-md shadow-[0_6px_9px_rgba(0,0,0,0.1)]">
						<img
							alt="Colorful sticky notes and pens on a purple background"
							className="w-[400px] h-[300px] rounded-lg"
							src="https://i.imghippo.com/files/xirIt1727085598.png"
						/>
					</div>
				</div>
			</div>

			{/* Seamless Experience Section */}
			<div className="p-6 md:p-24 w-full">
				<h1 className="text-4xl m-plus-rounded-1c-thin mb-6 text-center">
					Why Choose Assessment?
				</h1>
				<div className="flex flex-col md:flex-row items-center">
					<div className="p-3 bg-gradient-to-r from-slate-100 to-emerald-50 rounded-md shadow-[0_6px_9px_rgba(0,0,0,0.1)]">
						<img
							alt="Colorful sticky notes and pens on a purple background"
							className="w-[400px] h-[300px] rounded-lg"
							src="https://i.imghippo.com/files/VMlzU1727085735.png"
						/>
					</div>
					<div className="ml-0 md:ml-6 m-plus-rounded-1c-thin text-center md:text-left">
						<h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-500 bg-clip-text text-transparent mb-2">
							Seamless Experience
						</h2>
						<p className="text-gray-700 text-lg m-plus-rounded-1c-thin mb-6 tracking-[0.2em]">
							Students can easily access quizzes through shared links and track
							their progress.
						</p>
					</div>
				</div>
			</div>
			{/* Footer */}
			<footer className="bg-white w-full flex justify-center py-4">
				<p className="text-sm text-emerald-700">
					© 2024 Assessment, All Rights Reserved
				</p>
			</footer>
		</div>
	);
};

export default LandingPage;
