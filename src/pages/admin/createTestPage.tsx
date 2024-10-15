import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BackArrow } from '../../assets/svg/backArrow';
import { AssessmentConfigPart } from '../../component/assessment/assessmentConfigPart';
import { AssessmentQuestionsPart } from '../../component/assessment/createQuestionsPage';
import { useAssessments } from '../../hooks/useAssessment';
import { assessmentStore } from '../../store/staff/assessments';
import { QuestionsPreviewPart } from '../../component/assessment/questionsPreviewPage';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../component/spinner/loadingSpinner';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { AiFillAlert } from 'react-icons/ai';
import AiGenerateQuestionPopup from '../../component/assessment/aiGenerateQuestionPopup';
import { extractCodeFromResponse } from '../../utils/extractQuestionsFromAiResponse';
import { Config } from '../../config';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id'>;
// type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id' | 'levelId'>;

type handleGenerateProps = {
	topic: string;
	generateImage?: boolean;
	numberOfQuestions: number;
	answerTypeOptions: boolean;
	answerTypeTextArea: boolean;
	// timeDurationType: string;
	questionDifficulty: string;
	customTimeDurationPerQuestion?: { hours: number; minutes: number; overAllSeconds: number };
};
export const CreateAssessment = () => {
	const navigate = useNavigate();

	const { dept } = useParams();

	const [searchParams, _] = useSearchParams();

	const storeAssessment = assessmentStore();

	const [isPopupOpen, setIsPopupOpen] = useState(false);

	// const [isEditAssessmentConfig, setIsEditAssessmentConfig] = useState(false);

	const openAiPopup = () => {
		setIsPopupOpen(true);
	};

	const closeAiPopup = () => {
		setIsPopupOpen(false);
	};

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

	const [deleteQuestionIndex, setDeleteQuestionIndex] = useState<number>(0);

	const assessmentId = searchParams.get('assessmentId') as string;

	const levelId = searchParams.get('levelId') as string;

	const getAssessmentLevel = storeAssessment.levels.find((level) => level.id === levelId);

	const { getAssessment, generateAiQuestions } = useAssessments({
		assessmentId: assessmentId,
	});

	const element = document.getElementById('create_ques_part');

	const [previewData, setPreviewData] = useState<OmittedCreateQuestionPayload[]>([]);

	const dataIsLoading =
		getAssessment.isFetching || getAssessment.isLoading || getAssessment.isRefetching;

	useEffect(() => {
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [element]);

	useEffect(() => {
		const getLevelQuestions =
			getAssessmentLevel?.questions as OmittedCreateQuestionPayload[];

		const localStoredCurrentLevelQuestions = JSON.parse(
			localStorage.getItem(levelId) as string,
		) as OmittedCreateQuestionPayload[];

		const questions = localStoredCurrentLevelQuestions?.length
			? localStoredCurrentLevelQuestions
			: getLevelQuestions;

		if (questions?.length) {
			setPreviewData([...questions]);
		} else {
			setPreviewData([]);
		}
	}, [levelId, storeAssessment.levels, currentQuestionIndex]);

	const handleFormSubmit = (newData: OmittedCreateQuestionPayload) => {
		if (currentQuestionIndex) {
			let questionsArray = JSON.parse(
				localStorage.getItem(levelId) as string,
			) as OmittedCreateQuestionPayload[];

			questionsArray[(currentQuestionIndex - 1) as number] = newData;

			localStorage.setItem(levelId, JSON.stringify(questionsArray));

			setPreviewData([...questionsArray]);

			setCurrentQuestionIndex(0);
		} else {
			const modifiedData = {
				question: newData.question,
				imageUrl: newData.imageUrl,
				enableImage: newData.enableImage,
				questionType: newData.questionType,
				options: newData.options,
				answer: newData.answer,
				timer: newData.timer,
			};

			const localStoreQues = JSON.parse(localStorage.getItem(newData.levelId) as string);

			const storeQues = getAssessmentLevel?.questions as OmittedCreateQuestionPayload[];

			const storedQuestions = localStoreQues
				? localStoreQues
				: storeQues
					? storeQues
					: [];
			storedQuestions.push(modifiedData);

			localStorage.setItem(newData.levelId, JSON.stringify(storedQuestions));

			setPreviewData([...storedQuestions]);
		}
	};

	const handleDeleteQuestion = (index: number) => {
		const questionsInLocalStore = localStorage.getItem(levelId);

		if (questionsInLocalStore) {
			const questionsArray: OmittedCreateQuestionPayload[] =
				JSON.parse(questionsInLocalStore);

			if (index >= 0 && index < questionsArray.length) {
				questionsArray.splice(index, 1);

				localStorage.setItem(levelId, JSON.stringify(questionsArray));

				setPreviewData([...questionsArray]);

				setDeleteQuestionIndex(0);
			} else {
				console.error('Invalid index provided for deletion.');
			}
		} else {
			console.error('No questions found in local storage.');
		}
	};

	const handleGenerate = async (data: handleGenerateProps) => {
		console.log(data.customTimeDurationPerQuestion);
		const prompt = `create ${dept} ${data.topic} questions count ${data.numberOfQuestions} and ${data.answerTypeOptions && data.answerTypeTextArea == false ? 'only choice questions' : ''}  ${data.answerTypeTextArea && data.answerTypeOptions == false ? 'only choice textarea' : ''} ${data.generateImage ? '' : 'Could not add any image url and could not enableImage'} and defficulty type is ${data.questionDifficulty} and add time for every questions ${data.customTimeDurationPerQuestion?.overAllSeconds} seconds`;
		try {
			generateAiQuestions.mutateAsync({ prompt: prompt }).then((res) => {
				const data = extractCodeFromResponse(res as any) as [];
				const ParsedData = JSON.parse(
					(data as any)[0],
				) as OmittedCreateQuestionPayload[];
				console.log(ParsedData);
				localStorage.setItem(levelId, JSON.stringify(ParsedData));
				setPreviewData([...ParsedData]);
				setIsPopupOpen(false);
			});
		} catch (error) {
			console.error('Error generating content:', error);
		} finally {
		}
	};

	useEffect(() => {
		if (deleteQuestionIndex) {
			const localStoredQues = JSON.parse(
				localStorage.getItem(levelId) as string,
			) as OmittedCreateQuestionPayload[];
			if (!localStoredQues) {
				const findEditLevel = storeAssessment.levels.find(
					(level) => level.id === levelId,
				);

				localStorage.setItem(levelId, JSON.stringify(findEditLevel?.questions));

				handleDeleteQuestion(deleteQuestionIndex - 1);
			} else {
				handleDeleteQuestion(deleteQuestionIndex - 1);
			}
		}
	}, [deleteQuestionIndex]);

	return (
		<div className="relative flex w-full h-full bg-white">
			<div
				className={`w-full ${assessmentId ? 'lg:w-[60%]' : 'w-full'}  flex flex-col h-full`}
			>
				<div className="flex justify-between items-center gap-3 h-[8%] p-5">
					<div className="flex items-center gap-3 ">
						<div
							className="px-2 py-2 border border-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-300"
							onClick={() => {
								storeAssessment.resetAssessmentStore();
								navigate(`/staff-dashboard/${dept}?tab=assessments`, {
									replace: true,
								});
							}}
						>
							<BackArrow />
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Create Assessment</p>
						</div>
					</div>
					{window.location.href ===
					`${Config.environment.APP_URL}/create-assessment/${dept}` ? null : (
						<PrimaryButton
							onClick={() => openAiPopup()}
							icon={<AiFillAlert />}
							text={
								generateAiQuestions.isPending
									? 'Loading..'
									: 'Generate with AI'
							}
						/>
					)}
				</div>
				<div className="flex flex-col gap-5 px-5 py-3 overflow-y-auto bg-white">
					<div className="relative flex flex-col gap-2 px-5 pt-4 border border-gray-400 rounded-lg">
						<p className="font-semibold">Test Configuration</p>
						<AssessmentConfigPart />
						{/* {!isEditAssessmentConfig ? (
							<div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gray-500/25">
								<div className="flex justify-end p-5">
									<button
										className="border border-gray-300 w-[10%] bg-white rounded-lg py-2 shadow-md"
										onClick={() => {
											setIsEditAssessmentConfig((old) => !old);
										}}
									>
										Edit
									</button>
								</div>
							</div>
						) : null} */}
					</div>
					{!dataIsLoading && getAssessment.data?.levels.length ? (
						<div
							id={'create_ques_part'}
							className="flex flex-col gap-2 px-5 py-4 border border-gray-400 rounded-lg"
						>
							<p className="font-semibold">Create Questions</p>
							<AssessmentQuestionsPart
								onSubmit={handleFormSubmit}
								editQuestionIndex={currentQuestionIndex as number}
								resetEditIndex={setCurrentQuestionIndex}
							/>
						</div>
					) : null}
				</div>
			</div>
			{dataIsLoading ? (
				<div className="absolute bg-gray-600/70 w-full z-[10000] h-full flex justify-center items-center">
					<LoadingSpinner
						text="Fetching assessment data..."
						className="text-white font-bold"
					/>
				</div>
			) : null}
			{assessmentId ? (
				<div className="hidden w-full lg:w-[40%] h-full lg:flex">
					<QuestionsPreviewPart
						setDeleteQuestionIndex={setDeleteQuestionIndex}
						previewData={previewData}
						setEditQuestionIndex={setCurrentQuestionIndex}
					/>
				</div>
			) : null}

			{/* AI Generate Question Popup */}
			<AiGenerateQuestionPopup
				isQusetionTimerEnable={getAssessment?.data?.timerForWholeTest ?? true}
				loading={generateAiQuestions.isPending}
				handleGenerate={handleGenerate}
				isOpen={isPopupOpen}
				onClose={closeAiPopup}
			/>
		</div>
	);
};
