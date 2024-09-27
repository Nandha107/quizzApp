import { useNavigate, useParams } from 'react-router-dom';
import { BackArrow } from '../../assets/svg/backArrow';
import { Radio, Tabs, TabsProps, TimePicker } from 'antd';
import { useAssessments } from '../../hooks/useAssessment';
import { useState } from 'react';
import { Input } from '../../component/inputs/input';
import { FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { Dayjs } from 'dayjs';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { PrimaryOutlineButton } from '../../component/buttons/primaryOutlineButton';
import { useForm, useFieldArray } from 'react-hook-form';
import { PreviewQuestions } from '../../component/assessment/previewQuestions';

interface createTestType {
	question: string;
	timeDuration: {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	};
	chooseAnswerType: string;
	options: { value: string }[];
	textAreaAnswer: string;
	correctAnswer: string;
}

const CreateTestPage = () => {
	const navigate = useNavigate();
	const { assessmentId } = useParams();
	const { getAssessment } = useAssessments({ assessmentId });

	const levelsCount = getAssessment.data?.levelsCount ?? 0;

	const items: TabsProps['items'] = Array.from({ length: levelsCount }, (_, index) => ({
		id: getAssessment.data?.id ?? '',
		label: `Level ${index + 1}`,
		key: `Level ${index + 1}`,
	}));

	const { register, control, handleSubmit, reset, setValue, watch } =
		useForm<createTestType>({
			defaultValues: {
				question: '',
				timeDuration: { hours: 0, minutes: 0, overAllSeconds: 0 },
				chooseAnswerType: 'options',
				options: [{ value: '' }],
				textAreaAnswer: '',
				correctAnswer: '',
			},
		});

	const { fields, append, remove, update } = useFieldArray({
		control, // Pass control to useFieldArray hook
		name: 'options', // Name of the field to manage dynamically
	});

	const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

	const onTimeChange = (value: Dayjs | null) => {
		if (value) {
			const hours = value.hour();
			const minutes = value.minute();
			const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

			setValue('timeDuration', {
				hours,
				minutes,
				overAllSeconds,
			});

			setTimeValue(value);
		}
	};

	const addQuestion = (data: createTestType) => {
		const storedQuestions = localStorage.getItem('createQuestions');
		const questions = storedQuestions ? JSON.parse(storedQuestions) : [];

		localStorage.setItem('createQuestions', JSON.stringify([...questions, data]));
		reset();
		setTimeValue(null);
	};

	const handleCreateAssessmentQuestions = (data: createTestType) => {
		// Submit handler for form
		addQuestion(data);
	};

	return (
		<div className="h-full w-full flex bg-white">
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
							onChange={() => {}}
							className="w-full custom-tabs items-center justify-center "
						/>
						<div className=" w-full h-full flex flex-col lg:overflow-y-auto pr-5 pb-3">
							<div className="flex flex-col gap-3 pb-5">
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
											<span className="text-xl text-danger">*</span>
										</label>
										<div className="border border-gray-300 rounded-full w-full lg:w-[70%] py-1.5 lg:py-3 px-2">
											<TimePicker
												id="timeDuration"
												minuteStep={1}
												showSecond={false}
												showNow={false}
												value={timeValue}
												hourStep={1}
												className="w-full"
												variant="borderless"
												placeholder="Select Duration"
												onChange={onTimeChange}
											/>
										</div>
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
										{...register('chooseAnswerType')}
									>
										<Radio className="text-gray-500" value={'options'}>
											Options
										</Radio>
										<Radio className="text-gray-500" value={'textArea'}>
											Text area
										</Radio>
									</Radio.Group>
								</div>

								{/* Options Management */}
								<div className="flex flex-col gap-3">
									<label className="text-base text-secondary md:text-md flex gap-1">
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
													className="w-[80%]"
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
												onClick={() => append({ value: '' })}
											>
												<FaPlus className="text-blue-500" />
											</div>
										</div>
									</div>
								</div>

								{/* Correct Answer */}
								<Input
									label="Add Correct Answer"
									placeholder="Enter Correct Answer"
									isRequired
									{...register('correctAnswer')}
								/>
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
							className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] w-[45%] md:w-[25%]"
						/>
					</div>
				</div>
			</form>
			<div className="hidden w-full lg:w-[40%] h-full lg:flex">
				<PreviewQuestions />
			</div>
		</div>
	);
};

export default CreateTestPage;
