import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BackArrow } from '../../assets/svg/backArrow';
import { AssessmentConfigPart } from './assessmentConfigPart';
import { AssessmentQuestionsPart } from './createQuestionsPage';
import { useAssessments } from '../../hooks/useAssessment';
import { assessmentStore } from '../../store/staff/assessments';
import { QuestionsPreviewPart } from './questionsPreviewPage';
import { useEffect } from 'react';
import { LoadingSpinner } from '../spinner/loadingSpinner';

export const CreateAssessment = () => {
	const navigate = useNavigate();

	const { dept } = useParams();

	const [searchParams, _] = useSearchParams();

	const storeAssessment = assessmentStore();

	const assessmentId = searchParams.get('assessmentId') as string;

	const { getAssessment } = useAssessments({ assessmentId: assessmentId });

	const element = document.getElementById('create_ques_part');

	const dataIsLoading =
		getAssessment.isFetching || getAssessment.isLoading || getAssessment.isRefetching;

	useEffect(() => {
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [element]);

	console.log('33333333---------> ', localStorage.getItem('createQuestions'))

	return (
		<div className="relative flex w-full h-full bg-white">
			<div
				className={`w-full ${assessmentId ? 'lg:w-[60%]' : 'w-full'} flex flex-col h-full`}
			>
				<div className="flex items-center gap-3 h-[7%] p-5">
					<div
						className="px-2 py-2 border border-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-300"
						onClick={() => {
							storeAssessment.resetAssessmentStore();
							navigate(`/staff-dashboard/${dept}?tab=assessments`);
							// navigate(`/create-assessment/${dept}`);
						}}
					>
						<BackArrow />
					</div>
					<p className="text-xl font-bold">Create Assessment</p>
				</div>
				<div className="flex flex-col gap-5 px-5 py-3 overflow-auto bg-white">
					<div className="relative flex flex-col gap-2 px-5 pt-4 border border-gray-400 rounded-lg">
						<p className="font-semibold">Test Configuration</p>
						<AssessmentConfigPart />
						{assessmentId ? (
							<div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gray-500/25">
								<div className="flex justify-end p-5">
									<button className="border border-gray-300 w-[10%] bg-white rounded-lg py-2 shadow-md">
										Edit
									</button>
								</div>
							</div>
						) : null}
					</div>
					{!dataIsLoading && getAssessment.data?.levels.length ? (
						<div
							id={'create_ques_part'}
							className="flex flex-col gap-2 px-5 py-4 border border-gray-400 rounded-lg"
						>
							<p className="font-semibold">Create Questions</p>
							<AssessmentQuestionsPart />
						</div>
					) : null}
				</div>
			</div>
			{dataIsLoading ? (
				<div className="absolute bg-gray-600/70 w-full h-full flex justify-center items-center">
					<LoadingSpinner
						text="Fetching assessment data..."
						className="text-white font-bold"
					/>
				</div>
			) : null}
			{assessmentId ? (
				<div className="hidden w-full lg:w-[40%] h-full lg:flex">
					<QuestionsPreviewPart />
				</div>
			) : null}
		</div>
	);
};
