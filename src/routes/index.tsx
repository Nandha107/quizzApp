import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../component/layouts/appLayout';
import { AuthLayout } from '../component/layouts/authLayout';
import StaffDashboard from '../pages/admin/dashboard';
import StudentDashboard from '../pages/student/dashboard';
import AssessmentDetails from '../component/assessment/assessmentDetails';
import CoursesPage from '../pages/admin/coursesPage';
import QuestionPage from '../pages/student/questionPage';
import ResultPage from '../pages/student/ResultPage';
import { insecureRoutes } from './insecureRoutes';
import { CreateAssessment } from '../pages/admin/createTestPage';

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
						element: <CreateAssessment />,
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
