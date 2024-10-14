import { Checkbox, DatePicker, InputNumber } from 'antd';
import { Input } from '../inputs/input';
import TimeDurationSelect from '../inputs/timePicker';
import { assessmentStore } from '../../store/staff/assessments';
import { PrimaryOutlineButton } from '../buttons/primaryOutlineButton';
import { PrimaryButton } from '../buttons/primaryButton';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useAssessments } from '../../hooks/useAssessment';
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../spinner/loadingSpinner';

export const AssessmentConfigPart = () => {
	const { RangePicker } = DatePicker;

	const { dept } = useParams();

	const storeAssessment = assessmentStore();

	const { createAssessment } = useAssessments({ course: dept?.toUpperCase() });

	const [searchParams, setSearchParams] = useSearchParams();

	const assessmentId = searchParams.get('assessmentId') as string;

	const [isEditAssessmentConfig, setIsEditAssessmentConfig] = useState(false);

	const { getAssessment, updateAssessmentConfig } = useAssessments({
		assessmentId: assessmentId,
	});

	const [isLoading, setIsLoading] = useState(false);

	const onTimeChange = (data: { hours: string; minutes: string }) => {
		const hours = Number(data.hours); // Get the selected hour
		const minutes = Number(data.minutes); // Get the selected minutes

		// console.log('Selected Time:', hours, 'Hours', minutes, 'Minutes');

		const overAllSeconds = hours * 60 * 60 + minutes * 60;
		// const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

		storeAssessment.setCreateAssessment({
			...storeAssessment,
			duration: {
				hours,
				minutes,
				overAllSeconds,
			},
		});
	};

	const onDateRangeChange = (dateRange: Dayjs[] | null) => {
		if (dateRange) {
			// Convert the dates to Unix epoch time (milliseconds)
			const epochStartDate = dateRange[0]?.valueOf(); // Start date in epoch time
			const epochEndDate = dateRange[1]?.valueOf(); // End date in epoch time

			// console.log('Epoch Start Date:', epochStartDate);
			// console.log('Epoch End Date:', epochEndDate);

			storeAssessment.setCreateAssessment({
				...storeAssessment,
				dateRange: {
					range: dateRange as [Dayjs, Dayjs],
					startTime: epochStartDate / 1000,
					endTime: epochEndDate / 1000,
				},
			});

			// const formattedStartDate = dateRange[0]?.format('YYYY-MM-DD');
			// const formattedEndDate = dateRange[1]?.format('YYYY-MM-DD');
			// console.log('Start Date:', formattedStartDate);
			// console.log('End Date:', formattedEndDate);
		}
	};

	const onDateRangeConvert = (startTime: number, endTime: number) => {
		// console.log({ startTime, endTime });
		// Ensure that startTime and endTime are in milliseconds
		const convertedStartDate = dayjs(startTime); // Automatically handles if it's in milliseconds
		const convertedEndDate = dayjs(endTime);

		// Formatting the converted dates
		// console.log('Converted Start Date:', convertedStartDate.format('YYYY-MM-DD'));
		// console.log('Converted End Date:', convertedEndDate.format('YYYY-MM-DD'));

		// Create an array with the new Dayjs objects
		const newDateRange: Dayjs[] = [convertedStartDate, convertedEndDate];

		// Log the new date range array for verification
		// console.log('New Date Range:', newDateRange);

		return newDateRange; // Return the new date range array
	};

	const handleCreateAssessment = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form submission
		try {
			setIsLoading(true); // Show loading spinner while creating assessment
			const createNewAssessment = createAssessment
				.mutateAsync({
					name: storeAssessment.name,
					timerForWholeTest: storeAssessment.timerForWholeTest,
					duration: storeAssessment.duration,
					startTime: storeAssessment.dateRange.startTime as number,
					endTime: storeAssessment.dateRange.endTime as number,
					instructions: storeAssessment.instructions,
					category: dept?.toUpperCase() as string,
					levelsCount: storeAssessment.levelsCount as number,
				})
				.then((res) => {
					setIsLoading(false);
					// console.log({ newAssessment: res });
					setSearchParams(
						{ assessmentId: res.id, levelId: res.levels?.[0]?.id },
						{ replace: true },
					);
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});

			toast.promise(
				createNewAssessment,
				{
					loading: 'Assessment Creating...',
					success: 'Assessment Created Successfully',
					error: () =>
						createAssessment.isError
							? (createAssessment.error as any).message
							: 'Sorry! failed to create Assessment, please try again later',
				},

				{ id: 'Toast' },
			);

			await createNewAssessment;
			// const res = await createNewAssessment;

			// console.log({ createAssessment: res });
		} catch (err) {
			console.log('Cannot Create Assessment ====> ', err);
		}
	};

	const handleUpdateAssessmentConfig = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form submission
		try {
			setIsLoading(true); // Show loading spinner while creating assessment
			const updateAssessment = updateAssessmentConfig
				.mutateAsync({
					assessmentId: getAssessment?.data?.id as string,
					body: {
						name: storeAssessment.name,
						timerForWholeTest: storeAssessment.timerForWholeTest as boolean,
						duration: storeAssessment.duration,
						startTime: storeAssessment.dateRange.startTime as number,
						endTime: storeAssessment.dateRange.endTime as number,
						instructions: {
							heading: storeAssessment.instructions.heading as string,
							description: storeAssessment.instructions.description as string,
						},
						category: dept?.toUpperCase() as string,
						levelsCount: storeAssessment.levelsCount as number,
					},
				})
				.then(() => {
					setIsLoading(false);
					// console.log({ newAssessment: res });
					setIsEditAssessmentConfig((old) => !old);
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
				});

			toast.promise(
				updateAssessment,
				{
					loading: 'Assessment Config Updating...',
					success: 'Assessment Config Updated Successfully',
					error: () =>
						updateAssessmentConfig.isError
							? (createAssessment.error as any).message
							: 'Sorry! failed to update Assessment Config, please try again later',
				},

				{ id: 'Toast' },
			);

			await updateAssessment;
			// const res = await createNewAssessment;

			// console.log({ createAssessment: res });
		} catch (err) {
			console.log('Cannot Create Assessment ====> ', err);
		}
	};

	return (
		<form
			className="flex flex-col w-full h-full gap-5 p-3"
			onSubmit={
				storeAssessment.id ? handleUpdateAssessmentConfig : handleCreateAssessment
			}
		>
			<div className="md:grid md:grid-cols-2 md:gap-3">
				{/* Assessment Name Input */}
				<Input
					id="assessment_name"
					label="Assessment Name"
					htmlFor="assessment_name"
					type="text"
					placeholder="Enter Assessment Name"
					isRequired
					value={storeAssessment.name}
					onChange={(e) => {
						storeAssessment.setCreateAssessment({
							...storeAssessment,
							name: e.target.value,
						});
					}}
				/>
				{/* Department Input */}
				<Input
					id="department"
					label="Department"
					htmlFor="department"
					type="text"
					disabled
					InputClassName="hover:cursor-not-allowed text-gray-400"
					placeholder="Department"
					isRequired
					value={dept?.toUpperCase() as string}
				/>
			</div>
			{/* Time For Total Assessment Checkbox &  Time Duration Input */}
			<div className="flex flex-col gap-2 selection:select-none">
				<Checkbox
					checked={storeAssessment.timerForWholeTest}
					className="custom-checkbox"
					onChange={(e) => {
						storeAssessment.setCreateAssessment({
							...storeAssessment,
							timerForWholeTest: e.target.checked,
						});
					}}
				>
					Set Timer For Whole Assessment
				</Checkbox>

				{storeAssessment.timerForWholeTest ? (
					<div className="flex flex-col h-full">
						<label
							className="flex gap-1 text-base text-secondary md:text-md"
							htmlFor="timeDuration"
						>
							Time Duration <span className="text-xl text-danger">*</span>
						</label>
						<TimeDurationSelect
							// reset={Boolean(_.get('levelId'))}
							onDataChange={onTimeChange}
						/>
					</div>
				) : null}
			</div>
			<div className="md:grid md:grid-cols-2 md:gap-3">
				{/* Assessment Date Duration */}
				<div className="flex flex-col gap-y-2">
					<label
						className="flex gap-1 text-base text-secondary md:text-md"
						htmlFor="dateDuration"
					>
						Assessment Available Duration Period{' '}
						<span className="text-xl text-danger">*</span>
					</label>
					<div className="w-full px-2 border border-gray-300 rounded-full md:py-2 focus-within:ring-1 focus-within:ring-teal-600">
						<RangePicker
							id={'dateDuration'}
							size="large"
							className="w-full focus:outline-none"
							placeholder={['start-date', 'end-date']}
							value={storeAssessment.dateRange.range}
							variant="borderless"
							popupClassName="custom-range-picker-dropdown"
							onChange={(dateRange) => {
								onDateRangeChange(dateRange as Dayjs[]);
							}}
						/>
					</div>
				</div>
				{/* Assessment Level Count */}
				<div className="flex flex-col gap-y-2">
					<label
						className="flex gap-1 text-base text-secondary md:text-md"
						htmlFor="levelCount"
					>
						Total Level Count <span className="text-xl text-danger">*</span>
					</label>
					<div className="w-full px-2 py-1 border border-gray-300 rounded-full md:py-3 focus-within:ring-1 focus-within:ring-teal-600">
						<InputNumber
							min={1}
							max={10}
							id="levelCount"
							placeholder="Enter a Level Count"
							keyboard={true}
							variant="borderless"
							disabled={!!storeAssessment.id}
							changeOnWheel
							className="w-full focus:outline-none"
							value={storeAssessment.levelsCount}
							defaultValue={1}
							onChange={(e) => {
								storeAssessment.setCreateAssessment({
									...storeAssessment,
									levelsCount: e as number,
								});
							}}
						/>
					</div>
				</div>
			</div>
			{/* Assessment Instruction Heading & Description */}
			<div className="flex flex-col gap-1">
				<p className="text-base font-semibold">Assessment Instruction</p>
				<div className="flex flex-col gap-2">
					<Input
						id="ins_heading"
						label="Heading"
						htmlFor="ins_heading"
						type="text"
						placeholder="Enter Your Instruction Heading"
						isRequired
						value={storeAssessment.instructions.heading}
						onChange={(e) => {
							storeAssessment.setCreateAssessment({
								...storeAssessment,
								instructions: {
									...storeAssessment.instructions,
									heading: e.target.value,
								},
							});
						}}
					/>
					<div className="flex flex-col w-full gap-3">
						<label
							className="flex gap-1 text-base text-secondary md:text-md"
							htmlFor="ins_description"
						>
							Instruction
							<span className="text-xl text-danger">*</span>
						</label>
						<textarea
							id="ins_description"
							className="w-full border border-gray-300 p-3 min-h-[180px] max-h-[180px] rounded-xl resize-none focus-within:ring-1 focus-within:ring-teal-600"
							value={storeAssessment.instructions.description}
							onChange={(e) =>
								storeAssessment.setCreateAssessment({
									...storeAssessment,
									instructions: {
										...storeAssessment.instructions,
										description: e.target.value,
									},
								})
							}
						/>
					</div>
				</div>
			</div>
			{(!isEditAssessmentConfig && !assessmentId) || isEditAssessmentConfig ? (
				<div className="flex items-center justify-end gap-3">
					<PrimaryOutlineButton
						type="button"
						text={storeAssessment.id ? 'Cancel' : 'Clear'}
						disabled={isLoading}
						onClick={() => {
							if (storeAssessment.id) {
								storeAssessment.setCreateAssessment({
									...storeAssessment,
									id: getAssessment.data?.id as string,
									name: getAssessment.data?.name as string,
									timerForWholeTest: getAssessment.data
										?.timerForWholeTest as boolean,
									dateRange: {
										range: onDateRangeConvert(
											(getAssessment.data?.startTime as number) * 1000,
											(getAssessment.data?.endTime as number) * 1000,
										) as [Dayjs, Dayjs], // Call the function to convert epoch to Dayjs
										startTime: getAssessment.data?.startTime as number,
										endTime: getAssessment.data?.endTime as number,
									},
									levelsCount: getAssessment.data?.levelsCount as number,
									instructions: {
										heading: getAssessment.data?.instructions
											.heading as string,
										description: getAssessment.data?.instructions
											.description as string,
									},
								});
								setIsEditAssessmentConfig((old) => !old);
							} else {
								storeAssessment.resetAssessmentStore();
							}
						}}
					/>
					<PrimaryButton
						type="submit"
						className="disabled:bg-teal-600/200"
						icon={
							isLoading ? (
								<LoadingSpinner
									text="Updating..."
									className="font-semibold text-white"
								/>
							) : null
						}
						text={
							isLoading
								? ''
								: storeAssessment.id
									? 'Update Assessment'
									: 'Create Assessment'
						}
					/>
				</div>
			) : null}
			{!isEditAssessmentConfig && assessmentId ? (
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
			) : null}
		</form>
	);
};
