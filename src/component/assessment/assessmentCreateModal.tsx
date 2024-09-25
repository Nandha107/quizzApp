import { Button, Checkbox, DatePicker, InputNumber, TimePicker } from 'antd';
import Modal from 'antd/es/modal/Modal';
// import { LoadingSpinner } from '../spinner/loadingSpinner';
import { Config } from '../../config';
import { useState } from 'react';
// import { useAssessments } from '../../hooks/useAssessment';
import { Input } from '../inputs/input';
import { Dayjs } from 'dayjs';

const AssessmentCreateModal = () => {
	const { RangePicker } = DatePicker;

	const [isTimerForWholeAssessment, setIsTimerForWholeAssessment] = useState(false);
	const [assessmentName, setAssessmentName] = useState('');
	const [assessmentStartDate, setAssessmentStartDate] = useState<number>();
	const [assessmentEndDate, setAssessmentEndDate] = useState<number>();
	const [assessmentLevelCount, setAssessmentLevelCount] = useState(1);
	const [assessmentTimeDuration, setAssessmentTimeDuration] = useState<{
		hours: number;
		minutes: number;
		overAllSeconds: number;
	}>({ hours: 0, minutes: 0, overAllSeconds: 0 });
	const [assessmentInstruction, setAssessmentInstruction] = useState('');

	// const {createAssessment} = useAssessments({});

	console.log(assessmentStartDate,assessmentEndDate, assessmentTimeDuration)

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
	const getDept = localStorage.getItem(Config.localStorageKeys.dept);

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

	const onTimeChange = (value: Dayjs | null) => {
		if (value) {
			const hours = value.hour(); // Get the selected hour
			const minutes = value.minute(); // Get the selected minutes

			console.log('Selected Time:', hours, 'Hours', minutes, 'Minutes');

			const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

			console.log({ overAllSeconds });

			setAssessmentTimeDuration({
				hours,
				minutes,
				overAllSeconds,
			});
		}
	};

	// const handleCreateAssessment = () => {
		// createAssessment.mutateAsync({
		// 	name: assessmentName,
		// 	timerForWholeTest: isTimerForWholeAssessment,
		// 	duration: 0,
		// 	startTime: 0,
		// 	endTime: 0,
		// 	instructions: '',
		// 	category: '',
		// 	levelsCount: 0
		// })
	// };

	return (
		<Modal
			title={'Assessment Configuration'}
			open={Boolean(getDept)}
			centered
			styles={modalStyles}
			className=""
			width={800}
			footer={[
				<Button
					key="cancel"
					onClick={() => {}}
					style={{
						backgroundColor: 'white',
						color: '#0d9488',
						borderColor: '#0d9488',
					}} // Custom Cancel button
				>
					Clear
				</Button>,
				<Button
					key="create"
					type="primary"
					onClick={() => {}}
					style={{ backgroundColor: '#0d9488', borderColor: '' }} // Custom Ok button
				>
					Create Assessment
				</Button>,
			]}
		>
			<form className="flex flex-col gap-3 w-full p-3">
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
						value={getDept?.toUpperCase() as string}
					/>
				</div>
				{/* Time For Total Assessment Checkbox &  Time Duration Input */}
				<div className="flex flex-col md:w-[50%] gap-2 selection:select-none">
					<Checkbox
						checked={isTimerForWholeAssessment}
						onChange={(e) => setIsTimerForWholeAssessment(e.target.checked)}
					>
						Set Timer For Whole Assessment
					</Checkbox>
					{isTimerForWholeAssessment ? (
						<div className="flex flex-col gap-y-2">
							<label
								className="text-base text-secondary md:text-md flex gap-1"
								htmlFor="timeDuration"
							>
								Time Duration <span className="text-xl text-danger">*</span>
							</label>
							<div className="border border-gray-300 rounded-full w-full py-3 px-2">
								<TimePicker
									id="timeDuration"
									minuteStep={15}
									showSecond={false}
									showNow={false}
									// value={}
									hourStep={1}
									className="w-full"
									variant="borderless"
									placeholder="Select Duration"
									onChange={(value) => {
										console.log({ value });
										onTimeChange(value);
									}}
								/>
							</div>
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
						<div className="border border-gray-300 rounded-full w-full py-2 px-2">
							<RangePicker
								id={'dateDuration'}
								size="large"
								className="w-full"
								placeholder={['start-date', 'end-date']}
								variant="borderless"
								popupClassName="custom-range-picker-dropdown"
								onChange={(dateRange) => {
									console.log({ dateRange });
									onDateRangeChange(dateRange as Dayjs[]);
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
						<div className="border border-gray-300 rounded-full w-full py-3 px-2">
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
							value={''}
							onChange={() => {}}
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
								value={assessmentInstruction}
								onChange={(e) => setAssessmentInstruction(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default AssessmentCreateModal;
