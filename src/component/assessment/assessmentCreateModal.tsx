import { Button, Checkbox, InputNumber } from 'antd';
import Modal from 'antd/es/modal/Modal';
// import { LoadingSpinner } from '../spinner/loadingSpinner';
import { Config } from '../../config';
import { useState } from 'react';
import { InputWithSelector } from '../inputs/inputGroup/inputWithSelector';
import { useAssessments } from '../../hooks/useAssessment';

const AssessmentCreateModal = () => {
	const [isTimerForWholeAssessment, setIsTimerForWholeAssessment] = useState(false);
	const [assessmentName, setAssessmentName] = useState('');
	const [assessmentStartDate, setAssessmentStartDate] = useState('');
	const [assessmentEndDate, setAssessmentEndDate] = useState('');
	const [assessmentLevelCount, setAssessmentLevelCount] = useState(1);
	const [assessmentTimeDuration, setAssessmentTimeDuration] = useState(0);
	const [assessmentInstruction, setAssessmentInstruction] = useState('');

	// const {createAssessment} = useAssessments({});

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

	const handleCreateAssessment = () => {
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
	};

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
					Cancel
				</Button>,
				<Button
					key="ok"
					type="primary"
					onClick={() => {}}
					style={{ backgroundColor: '#0d9488', borderColor: '' }} // Custom Ok button
				>
					OK
				</Button>,
			]}
		>
			<form className="flex flex-col w-full p-3">
				<div className="md:grid md:grid-cols-2 md:gap-2">
					{/* Assessment Name Input */}
					<div className="flex flex-col w-full gap-1">
						<label className="text-sm text-gray-500" htmlFor="assessment_name">
							Assessment Name <span className="text-red-600">*</span>
						</label>
						<input
							type="text"
							id="assessment_name"
							placeholder="Enter Assessment Name"
							value={assessmentName}
							onChange={(e) => setAssessmentName(e.target.value)}
							className="w-full px-5 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-teal-600"
							required
						/>
					</div>
					{/* Department Input */}
					<div className="flex flex-col w-full gap-1">
						<label className="text-sm text-gray-500" htmlFor="assessment_name">
							Department
						</label>
						<input
							type="text"
							id="category"
							placeholder="Department"
							value={getDept?.toUpperCase() as string}
							disabled
							className="w-full px-5 py-2 text-sm border border-gray-300 rounded-full selection:select-none hover:cursor-not-allowed"
							required
						/>
					</div>
				</div>
				{/* Department Input */}
				<div className="flex flex-col md:w-[50%] gap-1 my-2 selection:select-none">
					<Checkbox
						checked={isTimerForWholeAssessment}
						onChange={(e) => setIsTimerForWholeAssessment(e.target.checked)}
					>
						Set Timer For Whole Assessment
					</Checkbox>
					{/* Department Input */}
					{isTimerForWholeAssessment ? (
						<InputWithSelector
							label="Time Duration"
							// icon={<DropUpArrowIcon />}
							input={{
								type: 'number',
								placeholder: 'Enter Time Duration',
								min: 0,
								max: 99999,
								onChange: (e) => {},
							}}
							onOptionSelect={() => {}}
							option={[]}
							activeOption={''}
						/>
					) : null}
				</div>
				{/* Assessment Name Input */}
				<div className="flex flex-col w-full gap-1"></div>
				{/* Assessment Name Input */}
				<div className="flex flex-col w-full gap-1">
					<label className="text-sm text-gray-500" htmlFor="assessment_name">
						Assessment Available Duration Period{' '}
						<span className="text-red-600">*</span>
					</label>
					<div className="w-full flex gap-3">
						<div className="flex flex-col w-[50%] gap-1">
							<label className="text-sm text-gray-500" htmlFor="assessment_name">
								Start Date
							</label>
							<input
								type="date"
								id="category"
								value={assessmentStartDate}
								onChange={(e) => setAssessmentStartDate(e.target.value)}
								className="w-full px-5 py-2 text-sm border border-gray-300 rounded-full selection:select-none cursor-pointer"
								required
							/>
						</div>
						<div className="flex flex-col w-[50%] gap-1">
							<label className="text-sm text-gray-500" htmlFor="assessment_name">
								End Date
							</label>
							<input
								type="date"
								id="category"
								value={assessmentEndDate}
								onChange={(e) => setAssessmentEndDate(e.target.value)}
								className="w-full px-5 py-2 text-sm border border-gray-300 rounded-full selection:select-none cursor-pointer"
								required
							/>
						</div>
					</div>
					{/* Assessment Name Input */}
					<div className="flex flex-col w-[50%] gap-1">
						<label className="text-sm text-gray-500" htmlFor="level_count">
							Set Total Level Count <span className="text-red-600">*</span>
						</label>
						<div
							id="level_count"
							className="w-full border border-gray-300 p-1 rounded-full  "
						>
							<InputNumber
								min={1}
								max={5}
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
					{/* Assessment Name Input */}
					<div className="flex flex-col w-[100%] gap-1">
						<label className="text-sm text-gray-500" htmlFor="instruction">
							Instruction<span className="text-red-600">*</span>
						</label>
						<textarea
							id="instruction"
							className="w-full border border-gray-300 p-3 min-h-[150px] max-h-[150px]"
							value={assessmentInstruction}
							onChange={(e) => setAssessmentInstruction(e.target.value)}
						/>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default AssessmentCreateModal;
