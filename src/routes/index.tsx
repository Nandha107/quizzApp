import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../component/layouts/appLayout';
import { AuthLayout } from '../component/layouts/authLayout';
import StaffDashboard from '../pages/admin/dashboard';
import StudentDashboard from '../pages/student/dashboard';
import AssessmentDetails from '../component/assessment/assessmentDetails';
import CoursesPage from '../pages/admin/coursesPage';
import CreateTestPage from '../pages/admin/createTest';
// import AssessmentCreateModal from '../component/assessment/assessmentCreateModal';
import QuestionPage from '../pages/student/questionPage';
import ResultPage from '../pages/student/ResultPage';
import { insecureRoutes } from './insecureRoutes';
import { CreateAssessment } from '../component/assessment/createTestPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			...insecureRoutes,
			{
				path: '',
				element: <AuthLayout />,
				children: [
					{
						path: 'staff-dashboard/courses',
						element: <CoursesPage />,
					},
					{
						path: 'staff-dashboard/:dept',
						element: <StaffDashboard />,
					},
					{
						path: 'create-assessment/:dept',
						element: <CreateAssessment/>,
					},
					// {
					// 	path: 'create-assessment/:dept',
					// 	element: <AssessmentCreateModal />,
					// },
					{
						path: 'staff-dashboard/:dept/:assessmentId/create-level',
						element: <CreateTestPage />,
					},
					{
						path: 'assessment-analytics/:assessmentId',
						element: <AssessmentDetails />,
					},
					{
						path: 'student-dashboard',
						element: <StudentDashboard />,
					},
					{
						path: 'question/:testId',
						element: <QuestionPage />,
					},
					{
						path: '/result/:userMarksId',
						element: <ResultPage />,
					},
				],
			},
		],
	},
]);
