import { useNavigate } from 'react-router-dom';
import { useStudents } from '../../hooks/user/students/useStudents';
import { parseJwt } from '../../utils/parseJWT';

const StudentDashboard = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	let studentId;
	let category;

	if (token) {
		const decodedToken = parseJwt(token);
		studentId = decodedToken.sub;
		category = decodedToken.department;
	}

	const { tests } = useStudents();
	const Tests = tests({ studentId, category });
	if (Tests.isLoading) return <div>Loading...</div>;
	if (Tests.error) return <div>Error loading data</div>;

	return (
		<div className=" flex-wrap flex gap-2 p-7">
			{Tests.data?.map((test) => (
				<div className="bg-white rounded-md shadow-md p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-medium text-gray-900">{test.name}</h2>
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
							<span className="font-medium">Department:</span> {test.category}
						</p>
						<p className="mb-4">
							<span className="font-medium">Total questions:</span>{' '}
							{test.totalQuestions}
						</p>
					</div>
					<button
						onClick={() => navigate(`/question/${test.id}`)}
						className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md"
					>
						Complete test
					</button>
				</div>
			))}
		</div>
	);
};

export default StudentDashboard;
