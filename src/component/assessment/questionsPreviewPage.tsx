import { useSearchParams } from 'react-router-dom';
import { useAssessments } from '../../hooks/useAssessment';
// import { assessmentStore } from '../../store/staff/assessments';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { TextArea } from '../inputs/textArea';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id' | 'levelId'>;

export const QuestionsPreviewPart = () => {
	// const storeAssessment = assessmentStore();

	const [searchParams, _] = useSearchParams();

	const getLevelId = searchParams.get('levelId');

	console.log({ getLevelId });

	const { getAssessmentLevel } = useAssessments({ levelId: getLevelId as string });

	const getLocalStorageQuestionsItem = localStorage.getItem('createQuestions');

	const localStorageQuestions = JSON.parse(getLocalStorageQuestionsItem as string);

	const getLevelQues = getAssessmentLevel.data?.questions as OmittedCreateQuestionPayload[];

	console.log({ getLevelQues });

	const quesPreview = localStorageQuestions?.length ? localStorageQuestions : getLevelQues;

	console.log({ quesPreview });

	// : getAssessmentLevel.data?.questions;

	console.log({ getLocalStorageQuestionsItem });
	console.log({ getLevelQues });
	return (
		<div className="flex flex-col w-full h-full gap-5 p-5">
			<p className="text-2xl font-semibold">Preview</p>
			<div className="flex flex-col items-center gap-3 px-16 py-8 overflow-y-scroll border border-gray-300 rounded-lg bg-gray-300/15">
				<div className="flex flex-col w-full gap-3">
					{quesPreview ? (
						<>
							{quesPreview.map(
								(question: OmittedCreateQuestionPayload, index: number) => {
									return (
										<div key={index} className="flex flex-col gap-4">
											<p className="px-2 text-xl font-bold">
												{' '}
												{index + 1}. {question.question}
											</p>
											<div className="flex flex-col gap-2 min-w-[80%] max-w-full">
												{question.options.length ? (
													question.options.map(
														(
															option: { value: string },
															index: number,
														) => {
															return (
																<div
																	key={index}
																	className="flex gap-3 items-center p-1 border border-[#DFDFDF] rounded-lg bg-white w-[80%]"
																>
																	<div className="w-[10%] flex justify-center py-1 rounded-lg bg-[#DFDFDF]">
																		<p className="text-lg font-bold">
																			{index + 1}
																		</p>
																	</div>
																	<div className="w-full">
																		<p className="text-lg">
																			{option.value}
																		</p>
																	</div>
																</div>
															);
														},
													)
												) : (
													<TextArea
														key={index}
														placeholder="Enter Your Answer"
														disabled
													/>
												)}
											</div>
										</div>
									);
								},
							)}
						</>
					) : (
						<>No More Questions...</>
					)}
				</div>
			</div>
		</div>
	);
};
