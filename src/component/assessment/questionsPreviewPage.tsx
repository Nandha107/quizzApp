import toast from 'react-hot-toast';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { PrimaryButton } from '../buttons/primaryButton';
import { TextArea } from '../inputs/textArea';
import { useAssessments } from '../../hooks/useAssessment';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { assessmentStore } from '../../store/staff/assessments';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id' | 'levelId'>;
type props = {
	// setFormValues: (value: OmittedCreateQuestionPayload) => void;

	// setEdit: (value: boolean) => void;

	previewData: OmittedCreateQuestionPayload[];

	setEditQuestionIndex: (value: number) => void;

	handleDelete: (value: number) => void;
};
export const QuestionsPreviewPart: React.FC<props> = ({
	previewData,
	// handleDelete,
	setEditQuestionIndex,
	// setEdit,
	// setFormValues,
}) => {
	const { levels, levelsCount, resetAssessmentStore } = assessmentStore();

	const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
	const [nextLevelIndex, setNextLevelIndex] = useState(1);

	const navigate = useNavigate();

	const { dept } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();

	const [btnText, setBtnText] = useState('Save');

	const assessmentId = searchParams.get('assessmentId') as string;

	const levelId = searchParams.get('levelId') as string;

	const storedQuestions = localStorage.getItem(levelId);

	const { updateAssessment } = useAssessments({ assessmentId });

	const nextLevel = levels[currentLevelIndex];

	const handleSaveLevel = (e: React.FormEvent) => {
		e.preventDefault();

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
				.then(() => {
					localStorage.removeItem(levelId);

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
		if (levels?.length) {
			const LevelIndex = levels?.findIndex((level) => level?.id === levelId) + 1;
			setCurrentLevelIndex(LevelIndex);

			const nextIndex = levels?.findIndex((level) => level?.id === levelId) + 1 + 1;
			setNextLevelIndex(nextIndex);
		}
	}, [levels, levelId]);

	useEffect(() => {
		if (levelsCount > currentLevelIndex) {
			const isAnyStoreQuesInCurrentLevel =
				levels?.[currentLevelIndex - 1]?.questions?.length;

			if (storedQuestions && isAnyStoreQuesInCurrentLevel) {
				setBtnText(`Update & Go To Level ${nextLevelIndex}`);
			} else {
				setBtnText(`Save & Go To Level ${nextLevelIndex}`);
			}
		} else {
			if (levelsCount === currentLevelIndex) {
				setBtnText('Ready to Publish');
			}
		}
	}, [levelId, levels.length, currentLevelIndex, storedQuestions]);

	return (
		<div className="flex flex-col w-full h-full pr-5">
			<div className="flex items-center h-[7%]">
				<p className="text-2xl font-semibold">Preview</p>
			</div>
			<div className="flex flex-col h-[86%] items-center gap-3 px-5 py-8 overflow-y-scroll border border-gray-300 rounded-lg bg-gray-300/15">
				{/* <div className="flex flex-col h-[91.5%] items-center gap-3 px-16 py-8 overflow-y-scroll border border-gray-300 rounded-lg bg-gray-300/15"> */}
				<div className="flex flex-col w-full gap-5">
					{previewData?.length ? (
						previewData.map(
							(question: OmittedCreateQuestionPayload, index: number) => {
								return (
									<div
										key={index}
										className="flex flex-col gap-4 border border-gray-400/90 rounded-lg p-5 group relative hover:cursor-pointer"
									>
										<div className="flex items-center justify-between">
											<p className="px-2 text-xl font-bold">
												{index + 1}. {question.question}
											</p>
										</div>
										{question.enableImage ? (
											<div className="relative w-full h-[250px] bg-gray-600/10 rounded-lg border border-gray-300">
												<img
													src={question.imageUrl}
													alt="quesPreview"
													className={`absolute inset-0 w-full h-full object-contain rounded`}
												/>
											</div>
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
												<div>
													<TextArea
														key={index}
														className="group-hover:cursor-pointer"
														placeholder="Enter Your Answer"
														disabled
													/>
												</div>
											)}
										</div>
										<div className="absolute top-[1.1rem] right-[1.1rem] hidden gap-2 group-hover:flex">
											<div
												title="Edit"
												className="border border-gray-500 bg-gray-600/10 rounded-lg flex justify-center items-center p-2 hover:cursor-pointer"
												onClick={() => {
													const element =
														document.getElementById(
															'create_ques_part',
														);
													if (element) {
														element.scrollIntoView({
															behavior: 'smooth',
															block: 'start',
														});
													}
													setEditQuestionIndex(index + 1);
												}}
											>
												<FaEdit className="text-lg text-gray-600" />
											</div>
											<div
												title="Delete"
												className="border border-gray-500 bg-red-600/20 rounded-lg flex justify-center items-center p-2 hover:cursor-pointer"
												onClick={() => {}}
											>
												<FaTrashAlt className="text-lg text-red-600" />
											</div>
										</div>
									</div>
								);
							},
						)
					) : (
						<>No More Questions...</>
					)}
				</div>
			</div>
			<div className=" h-[7%] flex items-center justify-end">
				<PrimaryButton
					text={btnText}
					type="button"
					disabled={!storedQuestions}
					className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem]"
					onClick={handleSaveLevel}
				/>
			</div>
		</div>
	);
};
