import toast from 'react-hot-toast';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { PrimaryButton } from '../buttons/primaryButton';
import { TextArea } from '../inputs/textArea';
import { useAssessments } from '../../hooks/useAssessment';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { assessmentStore } from '../../store/staff/assessments';
import { useEffect } from 'react';
import { useState } from 'react';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id' | 'levelId'>;
type props = {
	setFormValues: (value: OmittedCreateQuestionPayload) => void;

	setEdit: (value: boolean) => void;

	previewData: OmittedCreateQuestionPayload[];

	setCurrentQuestionIndex: (value: number) => void;

	handleDelete: (value: number) => void;
};
export const QuestionsPreviewPart: React.FC<props> = ({
	previewData,
	handleDelete,
	setCurrentQuestionIndex,
	setEdit,
	setFormValues,
}) => {
	const { levels, levelsCount, resetAssessmentStore } = assessmentStore();

	const navigate = useNavigate();

	const { dept } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();

	const [btnText, setBtnText] = useState('Save');

	const assessmentId = searchParams.get('assessmentId') as string;

	const levelId = searchParams.get('levelId') as string;

	const { updateAssessment } = useAssessments({ assessmentId });

	const currentLevelIndex = levels?.findIndex((level) => level?.id === levelId) + 1;

	const nextLevelIndex = levels?.findIndex((level) => level?.id === levelId) + 1 + 1;

	const nextLevel = levels[currentLevelIndex];

	const handleSaveLevel = (e: React.FormEvent) => {
		e.preventDefault();

		const storedQuestions = localStorage.getItem(`createQuestions`);

		if (!storedQuestions) return;

		const questions = JSON.parse(storedQuestions);

		try {
			const updateAssessmentLevel = updateAssessment
				.mutateAsync({
					levelId: levelId as string,
					body: {
						levelName: `Level ${currentLevelIndex}`,
						levelNo: currentLevelIndex,
						marks: 1,
						minusMarks: 1,
						questions: [...questions],
					},
				})
				.then((res) => {
					console.log('updateAssessmentLevel res', res);
					localStorage.removeItem(`createQuestions`);

					console.log({ itemsLength: levels.length });
					console.log({ currentLevelIndex });

					if (levelsCount > currentLevelIndex) {
						const updatedParams = new URLSearchParams(searchParams);
						updatedParams.set('levelId', `${nextLevel.id}`); // Adding 'levelId' parameter
						setSearchParams(updatedParams);
					} else {
						if (levelsCount === currentLevelIndex) {
							resetAssessmentStore();
							navigate(`/staff-dashboard/${dept}?tab=assessments`);
						}
					}
				})
				.catch((err) => {
					console.log('updateAssessmentLevel err', err);
				});

			toast.promise(
				updateAssessmentLevel,
				{
					loading: 'Assessment Level Updating...',
					success: 'Assessment Level Updated Successfully',
					error: () =>
						updateAssessment.isError
							? (updateAssessment.error as any).message
							: 'Sorry! failed to Update Assessment Level, please try again later',
				},

				{ id: 'Toast' },
			);
		} catch (err) {
			console.log('Cannot Create Levels and Questions Assessment ====> ', err);
		}
	};

	useEffect(() => {
		if (levelsCount > currentLevelIndex) {
			setBtnText(`Save & Go To Level ${nextLevelIndex}`);
		} else {
			if (levelsCount === currentLevelIndex) {
				setBtnText('Ready to Publish');
			}
		}
	}, [levelId, levels.length]);

	return (
		<div className="flex flex-col w-full h-full pr-5">
			<div className="flex items-center h-[7%]">
				<p className="text-2xl font-semibold">Preview</p>
			</div>
			<div className="flex flex-col h-[86%] items-center gap-3 px-16 py-8 overflow-y-scroll border border-gray-300 rounded-lg bg-gray-300/15">
				{/* <div className="flex flex-col h-[91.5%] items-center gap-3 px-16 py-8 overflow-y-scroll border border-gray-300 rounded-lg bg-gray-300/15"> */}
				<div className="flex flex-col w-full gap-3">
					{previewData?.length ? (
						<>
							{previewData.map(
								(question: OmittedCreateQuestionPayload, index: number) => {
									return (
										<div key={index} className="flex flex-col gap-4">
											<p className="px-2 text-xl font-bold">
												{index + 1}. {question.question}
											</p>
											{question.enableImage ? (
												<img src={question.imageUrl} />
											) : null}
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

											<div className='flex gap-2 w-full '><p
												onClick={() => {
													setCurrentQuestionIndex(index);
													setEdit(true);

													setFormValues({
														answer: question.answer,
														enableImage: question.enableImage,
														imageUrl: question.imageUrl,
														options: question.options,
														question: question.question,
														questionType: question.questionType,
														timer: question.timer,
													});
												}}
												className="bg-green-400 p-4 w-full cursor-pointer"
											>
												edit
											</p>
											<p
												className="bg-red-400 p-4 w-full cursor-pointer"
												onClick={() => handleDelete(index)}
											>
												delete
											</p></div>
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
			<div className=" h-[7%] flex items-center justify-end">
				<PrimaryButton
					text={btnText}
					type="button"
					className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem]"
					onClick={handleSaveLevel}
				/>
			</div>
		</div>
	);
};
