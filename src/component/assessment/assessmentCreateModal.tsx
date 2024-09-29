import { Checkbox, DatePicker, InputNumber } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { LoadingSpinner } from '../spinner/loadingSpinner';
import { useState } from 'react';
import { useAssessments } from '../../hooks/useAssessment';
import { Input } from '../inputs/input';
import { Dayjs } from 'dayjs';
import toast from 'react-hot-toast';
import { PrimaryButton } from '../buttons/primaryButton';
import { PrimaryOutlineButton } from '../buttons/primaryOutlineButton';
import { useNavigate, useParams } from 'react-router-dom';
import TimeDurationSelect from '../inputs/timePicker';

const AssessmentCreateModal = () => {
	const { RangePicker } = DatePicker;

	const { dept } = useParams();

	const [isModalOpen, setIsModalOpen] = useState(true);

	const [isLoading, setIsLoading] = useState(false);

	const [isTimerForWholeAssessment, setIsTimerForWholeAssessment] = useState(false);
	const [assessmentName, setAssessmentName] = useState('');
	const [assessmentStartDate, setAssessmentStartDate] = useState<number | null>();
	const [assessmentEndDate, setAssessmentEndDate] = useState<number | null>();
	const [assessmentLevelCount, setAssessmentLevelCount] = useState(1);
	const [assessmentTimeDuration, setAssessmentTimeDuration] = useState<{
		hours: number;
		minutes: number;
		overAllSeconds: number;
	}>({ hours: 0, minutes: 0, overAllSeconds: 0 });

	const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

	const [assessmentInstruction, setAssessmentInstruction] = useState({
		heading: '',
		description: '',
	});

	const { createAssessment } = useAssessments({});

	const navigate = useNavigate();

	const modalStyles = {
		header: {
			borderLeft: `8px solid #0d9488`,
			borderRadius: 0,
			paddingInlineStart: 5,
		},
		mask: {
			backdropFilter: 'blur(10px)',
		},
	};

	const onDateRangeChange = (dateRange: Dayjs[] | null) => {
		if (dateRange) {
			// Convert the dates to Unix epoch time (milliseconds)
			const epochStartDate = dateRange[0]?.valueOf(); // Start date in epoch time
			const epochEndDate = dateRange[1]?.valueOf(); // End date in epoch time

			console.log('Epoch Start Date:', epochStartDate);
			console.log('Epoch End Date:', epochEndDate);

			setAssessmentStartDate(epochStartDate);
			setAssessmentEndDate(epochEndDate);

			const formattedStartDate = dateRange[0]?.format('YYYY-MM-DD');
			const formattedEndDate = dateRange[1]?.format('YYYY-MM-DD');
			console.log('Start Date:', formattedStartDate);
			console.log('End Date:', formattedEndDate);
		}
	};

	const onTimeChange = (data: { hours: string; minutes: string }) => {
		const hours = Number(data.hours); // Get the selected hour
		const minutes = Number(data.minutes); // Get the selected minutes

		console.log('Selected Time:', hours, 'Hours', minutes, 'Minutes');

		const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

		console.log({ overAllSeconds });

		setAssessmentTimeDuration({
			hours,
			minutes,
			overAllSeconds,
		});
	};

	const onClear = () => {
		setAssessmentName('');
		setAssessmentStartDate(null);
		setAssessmentEndDate(null);
		setAssessmentInstruction({ heading: '', description: '' });
		setAssessmentLevelCount(1);
		setAssessmentTimeDuration({ hours: 0, minutes: 0, overAllSeconds: 0 });
		setDateRange([null, null]);
	};

	const handleCreateAssessment = async (event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form submission
		try {
			setIsLoading(true); // Show loading spinner while creating assessment
			const createNewAssessment = createAssessment
				.mutateAsync({
					name: assessmentName,
					timerForWholeTest: isTimerForWholeAssessment,
					duration: assessmentTimeDuration,
					startTime: assessmentStartDate as number,
					endTime: assessmentEndDate as number,
					instructions: assessmentInstruction,
					category: dept?.toUpperCase() as string,
					levelsCount: assessmentLevelCount,
				})
				.then((res) => {
					setIsLoading(false);
					setIsModalOpen(false); // Close the modal on success
					navigate(`/staff-dashboard/${dept}/${res.id}/create-level`);
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

			const res = await createNewAssessment;

			console.log({ createAssessment: res });
		} catch (err) {
			console.log('Cannot Create Assessment ====> ', err);
		}
	};

	return (
		<Modal
			title={'Assessment Configuration'}
			open={isModalOpen && Boolean(dept)}
			centered
			styles={modalStyles}
			width={800}
			footer={false}
			onCancel={() => {
				setIsModalOpen(false);
				navigate(-1);
			}} // Custom close button
		>
			<form
				className="flex flex-col gap-3 w-full h-full p-3"
				onSubmit={handleCreateAssessment}
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
						value={assessmentName}
						onChange={(e) => setAssessmentName(e.target.value)}
					/>
					{/* Department Input */}
					<Input
						id="department"
						label="Department"
						htmlFor="department"
						type="text"
						disabled
						InputClassName="hover:cursor-not-allowed"
						placeholder="Department"
						isRequired
						value={dept?.toUpperCase() as string}
					/>
				</div>
				{/* Time For Total Assessment Checkbox &  Time Duration Input */}

				<div className="flex flex-col gap-2 selection:select-none">
					<Checkbox
						checked={isTimerForWholeAssessment}
						onChange={(e) => setIsTimerForWholeAssessment(e.target.checked)}
					>
						Set Timer For Whole Assessment
					</Checkbox>
					{isTimerForWholeAssessment ? (
						<div className="flex flex-col h-full">
							<label
								className="text-base text-secondary md:text-md flex gap-1"
								htmlFor="timeDuration"
							>
								Time Duration <span className="text-xl text-danger">*</span>
							</label>
							<TimeDurationSelect onDataChange={onTimeChange} />
						</div>
					) : null}
				</div>
				<div className="md:grid md:grid-cols-2 md:gap-3">
					{/* Assessment Date Duration */}
					<div className="flex flex-col gap-y-2">
						<label
							className="text-base text-secondary md:text-md flex gap-1"
							htmlFor="dateDuration"
						>
							Assessment Available Duration Period{' '}
							<span className="text-xl text-danger">*</span>
						</label>
						<div className="border border-gray-300 rounded-full w-full md:py-2 px-2">
							<RangePicker
								id={'dateDuration'}
								size="large"
								className="w-full"
								placeholder={['start-date', 'end-date']}
								value={dateRange}
								variant="borderless"
								popupClassName="custom-range-picker-dropdown"
								onChange={(dateRange) => {
									onDateRangeChange(dateRange as Dayjs[]);
									setDateRange(dateRange as [Dayjs, Dayjs]);
								}}
							/>
						</div>
					</div>
					{/* Assessment Level Count */}
					<div className="flex flex-col gap-y-2">
						<label
							className="text-base text-secondary md:text-md flex gap-1"
							htmlFor="levelCount"
						>
							Total Level Count <span className="text-xl text-danger">*</span>
						</label>
						<div className="border border-gray-300 rounded-full w-full py-1 md:py-3 px-2">
							<InputNumber
								min={1}
								max={10}
								id="levelCount"
								placeholder="Enter a Level Count"
								keyboard={true}
								changeOnWheel
								className="w-full border-0 focus:ring-1 focus:ring-teal-600 focus:outline-none"
								value={assessmentLevelCount}
								defaultValue={1}
								onChange={(e) => setAssessmentLevelCount(e as number)}
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
							value={assessmentInstruction.heading}
							onChange={(e) => {
								setAssessmentInstruction({
									...assessmentInstruction,
									heading: e.target.value,
								});
							}}
						/>
						<div className="flex flex-col w-full gap-3">
							<label
								className="text-base text-secondary md:text-md flex gap-1"
								htmlFor="ins_description"
							>
								Instruction<span className="text-xl text-danger">*</span>
							</label>
							<textarea
								id="ins_description"
								className="w-full border border-gray-300 p-3 min-h-[180px] max-h-[180px] rounded-xl"
								value={assessmentInstruction.description}
								onChange={(e) =>
									setAssessmentInstruction({
										...assessmentInstruction,
										description: e.target.value,
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-end items-center gap-3">
					<PrimaryOutlineButton
						type="button"
						text="Clear"
						disabled={isLoading}
						onClick={onClear}
					/>
					<PrimaryButton
						type="submit"
						disabled={isLoading}
						className='disabled:bg-teal-600/200'
						icon={
							isLoading ? (
								<LoadingSpinner
									text="Creating..."
									className="text-white font-semibold"
								/>
							) : null
						}
						text={isLoading ? '' : 'Create Assessment'}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default AssessmentCreateModal;
