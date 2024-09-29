import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BackArrow } from '../../assets/svg/backArrow';
import { Radio, Tabs, TabsProps } from 'antd';
import { useAssessments } from '../../hooks/useAssessment';
import { useState } from 'react';
import { Input } from '../../component/inputs/input';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { PrimaryOutlineButton } from '../../component/buttons/primaryOutlineButton';
import { useForm, useFieldArray } from 'react-hook-form';
import { PreviewQuestions } from '../../component/assessment/previewQuestions';
import TimeDurationSelect from '../../component/inputs/timePicker';
import toast from 'react-hot-toast';
import { TextArea } from '../../component/inputs/textArea';

interface createTestType {
	question: string;
	timer: {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	};
	type: 'CHOICE' | 'TEXTAREA';
	options: { value: string }[];
	answer: string;
	// textAreaAnswer: string;
}

const CreateTestPage = () => {
	// const [levelIds, setLevelIds] = useState<string[]>([]);
	const navigate = useNavigate();
	const { assessmentId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const { getAssessment, updateAssessment } = useAssessments({ assessmentId });

	const levelsCount = getAssessment.data?.levelsCount ?? 0;

	const currentLevelId = searchParams.get('level') ?? '1';

	const items: TabsProps['items'] = Array.from({ length: levelsCount }, (_, index) => ({
		label: `Level ${index + 1}`,
		key: `${index + 1}`,
	}));

	const { register, control, handleSubmit, reset, setValue, watch } =
		useForm<createTestType>({
			defaultValues: {
				question: '',
				timer: { hours: 0, minutes: 0, overAllSeconds: 0 },
				type: 'CHOICE',
				options: [{ value: '' }],
				answer: '',
				// correctAnswer: '',
			},
		});

	const chooseQuestionType = watch('type');

	const { fields, append, remove } = useFieldArray({
	// const { fields, append, remove, update } = useFieldArray({
		control, // Pass control to useFieldArray hook
		name: 'options', // Name of the field to manage dynamically
	});

	const [activeTab, setActiveTab] = useState({
		label: `Level 1`,
		key: `1`,
	});

	const onTimeChange = (data: { hours: string; minutes: string }) => {
		const hours = Number(data.hours);
		const minutes = Number(data.minutes);
		const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

		setValue('timer', {
			hours,
			minutes,
			overAllSeconds,
		});
	};

	const handleCreateAssessmentQuestions = (data: createTestType) => {
		console.log({ data });
		const storedQuestions = localStorage.getItem('createQuestions');
		const questions = storedQuestions ? JSON.parse(storedQuestions) : [];

		localStorage.setItem(`createQuestions`, JSON.stringify([...questions, data]));
		reset();
	};

	const handleSaveLevel = () => {
		const storedQuestions = localStorage.getItem('createQuestions');
		const questions = storedQuestions ? JSON.parse(storedQuestions) : [];

		const getLevelIds = getAssessment.data?.levels.map((level) => level.id) as string[];

		const getCurrentLevelId = getLevelIds[Number(currentLevelId) - 1];

		try {
			const updateAssessmentLevel = updateAssessment.mutateAsync({
				levelId: getCurrentLevelId as string,
				body: {
					levelName: `Label ${currentLevelId}` ?? activeTab.label,
					levelNo: Number(currentLevelId),
					marks: 1,
					minusMarks: 1,
					questions: [...questions],
				},
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

	console.log({chooseQuestionType})

	return (
		<div className="h-full w-full flex bg-white">
			{getAssessment.isLoading ||
			getAssessment.isFetching ||
			getAssessment.isRefetching ? (
				<div className="bg-white flex flex-col justify-center items-center w-full h-full">
					<p>Please Wait Data is Loading....</p>
				</div>
			) : (
				<>
					<form
						className="w-full lg:w-[60%] h-full flex flex-col overflow-y-auto py-5"
						onSubmit={handleSubmit(handleCreateAssessmentQuestions)}
					>
						<div className="flex items-center gap-3 lg:h-[7%] px-10">
							<div
								className="px-2 py-2 border border-gray-500 rounded-xl hover:cursor-pointer hover:bg-gray-300"
								onClick={() => navigate(-1)}
							>
								<BackArrow />
							</div>
							<p className="text-base lg:text-2xl font-semibold">
								Create New Assessment
							</p>
						</div>
						<div className="flex flex-col lg:last:h-[90%] w-full pl-10 pr-3 justify-between">
							<div className="lg:border lg:border-gray-300 rounded-lg w-full lg:h-[90%] flex flex-col items-center lg:px-10 lg:pt-5">
								<Tabs
									defaultActiveKey="1"
									items={items}
									style={{ padding: '0px', display: 'block' }}
									activeKey={
										(currentLevelId as string) ?? (activeTab.key as string)
									}
									onChange={(key: string) => {
										console.log({ key });
										setSearchParams({ level: `${key}` });
										setActiveTab({
											label: `Level ${Number(key)}`,
											key,
										});
									}}
									className="w-full custom-tabs items-center justify-center "
								/>
								<div className=" w-full h-full flex flex-col lg:overflow-y-auto pr-5 pb-3">
									<div className="flex flex-col gap-3 pb-5 pl-1">
										{/* Question Input */}
										<Input
											label="Add Questions"
											isRequired
											placeholder="Enter your question"
											{...register('question')}
										/>

										{/* Time Picker */}
										{!getAssessment.data?.timerForWholeTest && (
											<div className="flex flex-col gap-y-2">
												<label
													className="text-base text-secondary md:text-md flex gap-1"
													htmlFor="timeDuration"
												>
													Time Duration for this question{' '}
													<span className="text-xl text-danger">
														*
													</span>
												</label>
												<TimeDurationSelect
													onDataChange={onTimeChange}
													{...register('timer')}
												/>
											</div>
										)}

										{/* Answer Type Radio */}
										<div className="flex flex-col gap-1">
											<label className="text-base text-secondary md:text-md flex gap-1">
												Choose Option Type
												<span className="text-xl text-danger">*</span>
											</label>
											<Radio.Group
												className="text-gray-300 flex gap-10"
												defaultValue={'CHOICE'}
												value={chooseQuestionType}
												{...register('type')}
												onChange={(e) => {
													console.log(e.target.value);
													setValue('type', e.target.value);
												}} // Set value on change
											>
												<Radio
													className="text-gray-500"
													value={'CHOICE'}
												>
													Options
												</Radio>
												<Radio
													className="text-gray-500"
													value={'TEXTAREA'}
												>
													Textarea
												</Radio>
											</Radio.Group>
										</div>

										{/* Options Management */}
										{chooseQuestionType === 'CHOICE' ? (
											<div className="flex flex-col gap-3">
												<label className="text-base text-secondary md:text-md flex gap-1">
													Add Options for above the question{' '}
													<span className="text-xl text-danger">
														*
													</span>
												</label>
												<div className="flex flex-col gap-3">
													{fields.map((field, index) => (
														<div
															key={field.id}
															className="flex gap-2 items-center px-0.5 group"
														>
															<Input
																placeholder={`Option ${index + 1}`}
																{...register(
																	`options.${index}.value`,
																)}
																className="w-full md:w-[60%]"
															/>
															<div
																className="group-hover:block hidden border border-danger p-3 md:p-4 rounded-full hover:cursor-pointer"
																onClick={() => remove(index)}
															>
																<FaTimes className="text-danger" />
															</div>
														</div>
													))}

													<div className="flex gap-2 items-center">
														<div
															className="border border-blue-500 rounded-full p-3 md:p-4 hover:cursor-pointer hover:bg-blue-600/15"
															onClick={() =>
																append({ value: '' })
															}
														>
															<FaPlus className="text-blue-500" />
														</div>
													</div>
												</div>
											</div>
										) : (
											<div className="flex flex-col gap-3">
												<label className="text-base text-secondary md:text-md flex gap-1">
													Answer{' '}
													<span className="text-xl text-danger">
														*
													</span>
												</label>
												<TextArea
													placeholder="Enter Your Correct Answer"
													className="text-xs"
													{...register('answer')}
												/>
											</div>
										)}

										{/* Correct Answer */}
										{chooseQuestionType === 'CHOICE' ? (
											<Input
												label="Add Correct Answer"
												placeholder="Enter Correct Answer"
												className="w-full md:w-[60%]"
												isRequired
												{...register('answer')}
											/>
										) : null}
									</div>
								</div>
							</div>
							{/* Submit Buttons */}
							<div className="w-full flex justify-between lg:mt-auto">
								<PrimaryOutlineButton
									text={`Add Question`}
									type="submit"
									className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] w-[45%] md:w-[25%]"
								/>
								<PrimaryButton
									text={`Save Level`}
									type="button"
									className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] w-[45%] md:w-[25%]"
									onClick={handleSaveLevel}
								/>
							</div>
						</div>
					</form>
					<div className="hidden w-full lg:w-[40%] h-full lg:flex">
						<PreviewQuestions />
					</div>
				</>
			)}
		</div>
	);
};

export default CreateTestPage;
