import { Radio, Tabs, TabsProps } from 'antd';
import { assessmentStore } from '../../store/staff/assessments';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../inputs/input';
import TimeDurationSelect from '../inputs/timePicker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { TextArea } from '../inputs/textArea';
import { PrimaryOutlineButton } from '../buttons/primaryOutlineButton';
import { PrimaryButton } from '../buttons/primaryButton';
import { useAssessments } from '../../hooks/useAssessment';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id' | 'levelId'>;

export const AssessmentQuestionsPart = () => {
	const storeAssessment = assessmentStore();

	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const assessmentId = searchParams.get('assessmentId') as string;

	const { updateAssessment } = useAssessments({ assessmentId });

	const currentLevelId = searchParams.get('levelId') as string;

	const items: TabsProps['items'] = storeAssessment.levels.map((level, index) => ({
		id: level.id as string,
		label: `Level ${index + 1}`,
		key: `${index + 1}`,
		// disabled: currentLevelId !== level.id ? true : false,
	}));

	const currentTab = items?.find((item) => item.id === currentLevelId);

	let currentLevelIndex = items.findIndex((item) => item.id === currentLevelId);

	console.log(items.length);

	let saveLevelBtnText = `Save Level ${currentLevelIndex + 1}`;

	// console.log({ levelIndex: currentLevelIndex });

	// Function to add new search parameters
	const addSearchParam = (key: string) => {
		const updatedParams = new URLSearchParams(searchParams);

		const findTab = items.find((item) => item.key === key);

		updatedParams.set('levelId', `${findTab?.id}`); // Adding 'levelId' parameter

		// Update the search parameters in the URL
		setSearchParams(updatedParams);
	};

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

	const { register, setValue, watch, control, reset, handleSubmit } =
		useForm<OmittedCreateQuestionPayload>({
			defaultValues: {
				question: '',
				timer: { hours: 0, minutes: 0, overAllSeconds: 0 },
				questionType: 'CHOICE',
				options: [{ value: '' }],
				answer: '',
				// correctAnswer: '',
			},
		});

	const chooseQuestionType = watch('questionType');

	// console.log({ chooseQuestionType });

	const { fields, append, remove } = useFieldArray({
		// const { fields, append, remove, update } = useFieldArray({
		control, // Pass control to useFieldArray hook
		name: 'options', // Name of the field to manage dynamically
	});

	const handleCreateAssessmentQuestions = (data: OmittedCreateQuestionPayload) => {
		// console.log(watch('questionType'));
		// console.log({ data });
		const storedQuestions = localStorage.getItem('createQuestions');
		const questions = storedQuestions ? JSON.parse(storedQuestions) : [];

		localStorage.setItem(`createQuestions`, JSON.stringify([...questions, data]));
		reset();
		window.location.reload();
	};

	const handleSaveLevel = () => {
		const storedQuestions = localStorage.getItem(`createQuestions`);

		if (!storedQuestions) return;

		const questions = JSON.parse(storedQuestions);

		try {
			const updateAssessmentLevel = updateAssessment
				.mutateAsync({
					levelId: currentLevelId as string,
					body: {
						levelName: `Level ${currentLevelIndex + 1}`,
						levelNo: currentLevelIndex + 1,
						marks: 1,
						minusMarks: 1,
						questions: [...questions],
					},
				})
				.then((res) => {
					console.log('updateAssessmentLevel res', res);
					localStorage.removeItem(`createQuestions`);

					if (storeAssessment.levelsCount > currentLevelIndex + 1) {
						console.log(111111444444);
						currentLevelIndex = currentLevelIndex + 1 + 1;
						saveLevelBtnText = `Save Level ${currentLevelIndex + 1 + 1}`;
						addSearchParam(`${currentLevelIndex}`);
					}
					if (items.length === currentLevelIndex + 1) {
						navigate('/staff-dashboard/mech?tab=assessments');
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
		if (chooseQuestionType === 'TEXTAREA') {
			setValue('options', []);
		}
	}, [chooseQuestionType]);

	return (
		<form
			className="flex flex-col w-full h-full gap-5 p-3"
			onSubmit={handleSubmit(handleCreateAssessmentQuestions)}
		>
			<div className="">
				<Tabs
					items={items}
					style={{ padding: '0px', display: 'block' }}
					defaultActiveKey={currentTab?.key}
					activeKey={currentTab?.key}
					onChange={(key) => {
						console.log({ key });
						addSearchParam(key);
					}}
					className="items-center justify-center w-full custom-tabs "
				/>
				<div className="flex flex-col w-full gap-5">
					{/* Question Input */}
					<Input
						label="Add Questions"
						isRequired
						placeholder="Enter your question"
						{...register('question')}
					/>
					{/* Time Picker */}
					{!storeAssessment.timerForWholeTest && (
						<div className="flex flex-col gap-y-2">
							<label
								className="flex gap-1 text-base text-secondary md:text-md"
								htmlFor="timeDuration"
							>
								Time Duration for this question{' '}
								<span className="text-xl text-danger">*</span>
							</label>
							<TimeDurationSelect
								onDataChange={onTimeChange}
								{...register('timer')}
							/>
						</div>
					)}
					{/* Answer Type Radio */}
					<div className="flex flex-col gap-1">
						<label className="flex gap-1 text-base text-secondary md:text-md">
							Choose Option Type
							<span className="text-xl text-danger">*</span>
						</label>
						<Controller
							control={control}
							name="questionType"
							render={({ field }) => (
								<Radio.Group {...field} value={chooseQuestionType}>
									<Radio className="text-gray-500" value="CHOICE">
										Options
									</Radio>
									<Radio className="text-gray-500" value="TEXTAREA">
										Textarea
									</Radio>
								</Radio.Group>
							)}
						/>
					</div>
					{/* Options Management */}
					{chooseQuestionType === 'CHOICE' ? (
						<div className="flex flex-col gap-3">
							<label className="flex gap-1 text-base text-secondary md:text-md">
								Add Options for above the question{' '}
								<span className="text-xl text-danger">*</span>
							</label>
							<div className="flex flex-col gap-3">
								{fields.map((field, index) => (
									<div
										key={field.id}
										className="flex gap-2 items-center px-0.5 group"
									>
										<Input
											placeholder={`Option ${index + 1}`}
											{...register(`options.${index}.value`)}
											className="w-full md:w-[60%]"
										/>
										<div
											className="hidden p-3 border rounded-full group-hover:block border-danger md:p-4 hover:cursor-pointer"
											onClick={() => remove(index)}
										>
											<FaTimes className="text-danger" />
										</div>
									</div>
								))}

								<div className="flex items-center gap-2">
									<div
										className="p-3 border border-blue-500 rounded-full md:p-4 hover:cursor-pointer hover:bg-blue-600/15"
										onClick={() => append({ value: '' })}
									>
										<FaPlus className="text-blue-500" />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-3">
							<label className="flex gap-1 text-base text-secondary md:text-md">
								Answer <span className="text-xl text-danger">*</span>
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
			{/* Submit Buttons */}
			<div className="flex justify-between w-full lg:mt-auto">
				<PrimaryOutlineButton
					text={`Add Question`}
					type="submit"
					className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] w-[45%] md:w-[25%]"
				/>
				<PrimaryButton
					text={saveLevelBtnText}
					type="button"
					className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] w-[45%] md:w-[25%]"
					onClick={handleSaveLevel}
				/>
			</div>
		</form>
	);
};
