import { Radio, Tabs, TabsProps } from 'antd';
import { assessmentStore } from '../../store/staff/assessments';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../inputs/input';
import TimeDurationSelect from '../inputs/timePicker';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AssessmentsStoreTypes } from '../../types/store/assessments';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { TextArea } from '../inputs/textArea';
import { PrimaryOutlineButton } from '../buttons/primaryOutlineButton';
import { useAssessments } from '../../hooks/useAssessment';
import { useEffect, useState } from 'react';
import ImageUploader from '../ImageUploder/main';
import { SecondaryOutlineButton } from '../buttons/secondaryOutlineButton';

// Assuming `AssessmentsStoreTypes.AssessmentData` has certain keys
type createQuestionPayload = AssessmentsStoreTypes.Questions;

// Omit specific keys from the type
type OmittedCreateQuestionPayload = Omit<createQuestionPayload, 'id'>;

type Props = {
	editQuestionIndex: number;
	resetEditIndex: (value: number) => void;
	onSubmit: (newData: OmittedCreateQuestionPayload) => void;
};
export const AssessmentQuestionsPart: React.FC<Props> = ({
	resetEditIndex,
	editQuestionIndex,
	onSubmit,
}) => {
	const storeAssessment = assessmentStore();

	const [searchParams, setSearchParams] = useSearchParams();

	const assessmentId = searchParams.get('assessmentId') as string;

	const { uploadImage, deleteImage, updateImage } = useAssessments({
		assessmentId,
	});

	const [dragging, setDragging] = useState(false);

	const [error, setError] = useState<string | null>(null);

	const currentLevelId = searchParams.get('levelId') as string;

	const items: TabsProps['items'] = storeAssessment.levels.map((level, index) => ({
		id: level.id as string,
		label: `Level ${index + 1}`,
		key: `${index + 1}`,
		// disabled: currentLevelId !== level.id ? true : false,
	}));

	const currentTab = items?.find((item) => item.id === currentLevelId);

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

	const {
		register,
		setValue,
		watch,
		control,
		reset,
		handleSubmit,
		formState: { isDirty },
	} = useForm<OmittedCreateQuestionPayload>({
		defaultValues: {
			levelId: currentLevelId,
			question: '',
			timer: {
				hours: 0,
				minutes: 1,
				overAllSeconds: 60000,
			},
			questionType: 'CHOICE',
			options: [{ value: '' }],
			answer: '',
			enableImage: false,
			imageUrl: 'https://i.ibb.co/fDZxHTp/Vector-1.png',
		},
	});

	const chooseQuestionType = watch('questionType');

	const { fields, append, remove } = useFieldArray({
		control, // Pass control to useFieldArray hook
		name: 'options', // Name of the field to manage dynamically
	});

	const handleCreateAssessmentQuestions = (data: OmittedCreateQuestionPayload) => {
		onSubmit({
			...data,
			levelId: currentLevelId,
		});
		reset();
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > 1 * 1024 * 1024) {
				// 10 MB size limit
				setError('File size should be less than 1 MB');
				return;
			}

			const reader = new FileReader();
			reader.onloadend = async () => {
				setValue('imageUrl', reader.result as string, { shouldDirty: true });

				const formData = new FormData();

				const FormattedFile = file;

				formData.append('file', FormattedFile);

				await uploadImage.mutateAsync({ file: formData }).then((res) => {
					setValue('imageUrl', res.url, { shouldDirty: true });
					setValue('enableImage', true, { shouldDirty: true });
				});

				setError(null);
			};

			reader.readAsDataURL(file);
		}
	};
	const handleUpdateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > 1 * 1024 * 1024) {
				// 10 MB size limit
				setError('File size should be less than 1 MB');
				return;
			}

			const reader = new FileReader();
			reader.onloadend = async () => {
				setValue('imageUrl', reader.result as string, { shouldDirty: true });

				const formData = new FormData();

				const FormattedFile = file;

				formData.append('file', FormattedFile);

				await updateImage
					.mutateAsync({
						file: formData,
						oldKey: watch('imageUrl').split('/').pop() as any,
					})
					.then((res) => {
						setValue('imageUrl', res.url, { shouldDirty: true });
						setValue('enableImage', true, { shouldDirty: true });
					});

				setError(null);
			};

			reader.readAsDataURL(file);
		}
	};
	const handleRemoveImage = async () => {
		await deleteImage
			.mutateAsync({ fileKey: watch('imageUrl').split('/').pop() as any })
			.then(() => {
				setValue('enableImage', false, { shouldDirty: true });
				setValue('imageUrl', 'https://i.ibb.co/fDZxHTp/Vector-1.png', {
					shouldDirty: true,
				});
			});
	};
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				setValue('imageUrl', e.target?.result as string);

				const formData = new FormData();

				const FormattedFile = file;

				formData.append('file', FormattedFile);

				await uploadImage.mutateAsync({ file: formData }).then((res) => {
					setValue('imageUrl', res.url, { shouldDirty: true });
					setValue('enableImage', true, { shouldDirty: true });
				});
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
		if (arr1.length !== arr2.length) return false;

		return arr1.every((obj, index) => JSON.stringify(obj) === JSON.stringify(arr2[index]));
	};

	useEffect(() => {
		if (chooseQuestionType === 'TEXTAREA') {
			setValue('options', []);
		}
	}, [chooseQuestionType]);

	useEffect(() => {
		if (editQuestionIndex) {
			const localStoredQues = JSON.parse(
				localStorage.getItem(currentLevelId) as string,
			) as OmittedCreateQuestionPayload[];
			if (!localStoredQues) {
				const findEditLevel = storeAssessment.levels.find(
					(level) => level.id === currentLevelId,
				);
				const findQues = findEditLevel?.questions?.[editQuestionIndex - 1];

				localStorage.setItem(currentLevelId, JSON.stringify(findEditLevel?.questions));

				reset(findQues);
				console.log({ sssss: isDirty });
			} else {
				const findEditQues = localStoredQues?.[editQuestionIndex - 1];
				reset(findEditQues);
			}
		} else {
			reset({
				question: '',
				timer: {
					hours: 0,
					minutes: 1,
					overAllSeconds: 60000,
				},
				questionType: 'CHOICE',
				options: [{ value: '' }],
				answer: '',
				enableImage: false,
				imageUrl: 'https://i.ibb.co/fDZxHTp/Vector-1.png',
				levelId: currentLevelId,
			});
		}
	}, [editQuestionIndex]);

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
						addSearchParam(key);
					}}
					className="items-center justify-center w-full custom-tabs "
				/>

				<div className="flex flex-col w-full gap-5">
					<div className="w-full">
						<ImageUploader
							handleRemoveImage={handleRemoveImage}
							handleUpdateImage={handleUpdateImage}
							uploaded={watch('enableImage')}
							imageUrl={watch('imageUrl')}
							handleImageChange={handleImageChange}
							handleDrop={handleDrop}
							handleDragOver={handleDragOver}
							handleDragLeave={handleDragLeave}
							dragging={dragging}
							loading={
								uploadImage.isPending ||
								deleteImage.isPending ||
								updateImage.isPending
							}
						/>
						{error && <p>{error}</p>}
					</div>
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
			<div className="flex justify-end w-full gap-3">
				{editQuestionIndex ? (
					<SecondaryOutlineButton
						text={`Cancel Edit`}
						type="button"
						className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem] border border-gray-500"
						onClick={() => {
							reset({
								question: '',
								timer: {
									hours: 0,
									minutes: 1,
									overAllSeconds: 60000,
								},
								questionType: 'CHOICE',
								options: [{ value: '' }],
								answer: '',
								enableImage: false,
								imageUrl: '',
								levelId: currentLevelId,
							});
							const getCurrentLevelInStore = storeAssessment.levels.find(
								(level) => level.id === currentLevelId,
							);

							const getCurrentLevelQuesInStore =
								getCurrentLevelInStore?.questions as OmittedCreateQuestionPayload[];

							const getLocalQues = JSON.parse(
								localStorage.getItem(currentLevelId) as string,
							) as OmittedCreateQuestionPayload[];

							const isSame = areArraysEqual(
								getCurrentLevelQuesInStore,
								getLocalQues,
							);

							if (isSame) localStorage.removeItem(currentLevelId);

							resetEditIndex(0);
						}}
					/>
				) : null}
				<PrimaryOutlineButton
					text={`${editQuestionIndex ? 'Update Question' : 'Add Question'}`}
					type="submit"
					className="h-[5rem] max-h-[5rem] md:h-[3rem] md:max-h-[3rem]"
					disabled={!isDirty}
				/>
			</div>
		</form>
	);
};
