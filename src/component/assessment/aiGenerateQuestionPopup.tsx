import React, { useEffect, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { PrimaryButton } from '../buttons/primaryButton';
import { departmentTopics } from '../../utils/departmentTopics';
import { useParams } from 'react-router-dom';
import TimeDurationSelect from '../inputs/timePicker';
import { FaFire, FaLeaf, FaMountain } from 'react-icons/fa';

type handleGenerateProps = {
	topic: string;
	generateImage?: boolean;
	numberOfQuestions: number;
	answerTypeOptions: boolean;
	answerTypeTextArea: boolean;
	questionDifficulty: string;
	customTimeDurationPerQuestion?: { hours: number; minutes: number; overAllSeconds: number };
};

interface PopupProps {
	isOpen: boolean;
	isQusetionTimerEnable: boolean;
	loading: boolean;
	onClose: () => void;
	handleGenerate: (value: handleGenerateProps) => void;
}

const AiGenerateQuestionPopup: React.FC<PopupProps> = ({
	isOpen,
	onClose,
	handleGenerate,
	loading: loding,
	isQusetionTimerEnable,
}) => {
	const [topic, setTopic] = useState<string>('');
	const [generateImage, setGenerateImage] = useState<boolean>(false);
	const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
	const [answerTypeOptions, setAnswerTypeOptions] = useState<boolean>(false);
	const [answerTypeTextArea, setAnswerTypeTextArea] = useState<boolean>(true);
	const [questionDifficulty, setQuestionDifficulty] = useState<string>('basic');
	const [customTimeDurationPerQuestion, setCustomTimeDurationPerQuestion] = useState<{
		hours: number;
		minutes: number;
		overAllSeconds: number;
	}>({
		hours: 0,
		minutes: 1,
		overAllSeconds: 60,
	});
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
	const { dept } = useParams() as any;

	// State for error messages
	const [errors, setErrors] = useState<{
		topic?: string;
		numberOfQuestions?: string;
		answerType?: string;
	}>({});

	// Validate form fields
	const validate = () => {
		const newErrors: {
			topic?: string;
			numberOfQuestions?: string;
			answerType?: string;
		} = {};

		if (!topic) {
			newErrors.topic = 'Topic is required';
		}

		if (numberOfQuestions <= 0) {
			newErrors.numberOfQuestions = 'Number of questions must be greater than 0';
		}

		if (!answerTypeOptions && !answerTypeTextArea) {
			newErrors.answerType = 'At least one answer type must be selected';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = () => {
		if (!validate()) return;

		const formData = {
			topic,
			generateImage,
			numberOfQuestions,
			answerTypeOptions,
			answerTypeTextArea,
			// timeDurationType,
			questionDifficulty,
			customTimeDurationPerQuestion,
		};
		handleGenerate(formData);

		setTopic('');
		setNumberOfQuestions(5);
		setQuestionDifficulty('basic');
	};

	const handleTopicSelection = (selectedTopic: string) => {
		setTopic(selectedTopic);
		setShowSuggestions(false);
	};

	const suggestionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				!loding &&
				suggestionRef.current &&
				!suggestionRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [suggestionRef]);

	const toggleDifficulty = (difficulty: string) => {
		setQuestionDifficulty(difficulty);
	};

	const onTimeChange = (data: { hours: string; minutes: string }) => {
		const hours = Number(data.hours);
		const minutes = Number(data.minutes);
		const overAllSeconds = hours * 60 * 60 + minutes * 60;
		// const overAllSeconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000;

		setCustomTimeDurationPerQuestion({
			hours,
			minutes,
			overAllSeconds,
		});
	};
	if (!isOpen) return null;
	const difficultyLevels = [
		{
			label: 'Basic',
			value: 'basic',
			color: 'bg-teal-500',
			textColor: 'text-white',
			icon: FaLeaf,
		},
		{
			label: 'Intermediate',
			value: 'intermediate',
			color: 'bg-yellow-500',
			textColor: 'text-white',
			icon: FaMountain,
		},
		{
			label: 'Harder',
			value: 'harder',
			color: 'bg-red-500',
			textColor: 'text-white',
			icon: FaFire,
		},
	];
	return (
		<div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50">
			<div className="bg-white lg:mt-10 rounded-lg shadow-lg md:w-[50%] w-[90%] lg:w-[50%] xl:w-[38%] relative">
				{/* Header */}
				<div className="flex justify-between py-3 rounded-t-lg px-5 border shadow-md">
					<div className="flex items-center w-full justify-between">
						<h1 className="text-xl font-semibold"> AI Test Creator</h1>
						<p
							className="hover:bg-slate-200 p-2 border border-slate-800 rounded-full cursor-pointer"
							onClick={onClose}
						>
							<CgClose className="h-5 w-5" />
						</p>
					</div>
				</div>

				<div className="px-10 py-2 flex flex-col gap-4">
					{/* Topic Input */}
					<div className="relative" ref={suggestionRef}>
						<label className="block text-gray-700">Topic</label>
						<input
							disabled={loding}
							type="text"
							placeholder="Enter Topic"
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
							onFocus={() => setShowSuggestions(true)}
							className={`w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 ${
								errors.topic
									? 'border-red-500 focus:ring-red-500'
									: 'focus:ring-teal-500'
							}`}
						/>
						{errors.topic && (
							<p className="text-red-500 text-sm">{errors.topic}</p>
						)}

						{/* Suggestions */}
						{showSuggestions && (
							<div
								className="absolute z-40 top-full mt-2 w-full bg-white border rounded-md shadow-lg overflow-hidden"
								style={{ maxHeight: '150px', overflowY: 'auto' }}
							>
								<div className="flex flex-wrap p-2">
									{departmentTopics[dept]?.map(
										(suggestion: any, index: number) => (
											<button
												key={index}
												className="flex-1 m-1 p-2 bg-teal-50 text-teal-600 border hover:border-teal-500 font-semibold rounded hover:bg-teal-100"
												onClick={() =>
													handleTopicSelection(suggestion)
												}
											>
												{suggestion}
											</button>
										),
									)}
								</div>
							</div>
						)}
					</div>

					{/* Difficulty Level with Like Buttons */}
					<div className="flex gap-4">
						{difficultyLevels.map((level) => {
							const Icon = level.icon; // Referencing the icon component
							return (
								<button
									disabled={loding}
									key={level.value}
									className={`p-2 flex items-center justify-center gap-2 rounded flex-1 ${
										questionDifficulty === level.value
											? `${level.color} ${level.textColor}`
											: 'bg-gray-200 text-gray-600'
									}`}
									onClick={() => toggleDifficulty(level.value)}
								>
									<Icon className="w-5 h-5" />
									{level.label}
								</button>
							);
						})}
					</div>

					{/* Image Generation Toggle */}
					<div className="flex items-center justify-between mb-4">
						<label className="text-gray-700">
							Generate Image{' '}
							<span className="text-sm text-gray-500">(Coming Soon)</span>
						</label>
						<label className="relative inline-flex items-center cursor-not-allowed">
							<input
								type="checkbox"
								className="sr-only peer"
								checked={generateImage}
								onChange={() => setGenerateImage(!generateImage)}
								disabled
							/>
							<div className="w-12 h-7 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
						</label>
					</div>

					{/* Number of Questions */}
					<div className="mb-4">
						<label className="block text-gray-700">Number of Questions</label>
						<input
							disabled={loding}
							type="number"
							value={numberOfQuestions}
							onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
							className={`w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 ${
								errors.numberOfQuestions
									? 'border-red-500 focus:ring-red-500'
									: 'focus:ring-green-500'
							}`}
						/>
						{errors.numberOfQuestions && (
							<p className="text-red-500 text-sm">{errors.numberOfQuestions}</p>
						)}
					</div>

					{/* Answer Type Selection */}
					<div className="flex flex-col gap-2">
						<label className="block text-gray-700">
							Choose answer type <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center mt-2 space-x-4">
							<div className="flex items-center gap-1">
								<input
									type="checkbox"
									className=" w-6 h-6 border border-gray-300 rounded-sm"
									checked={answerTypeOptions}
									onChange={() => setAnswerTypeOptions(!answerTypeOptions)}
								/>
								<label className="text-gray-700">Options</label>
							</div>
							<div className="flex items-center gap-1">
								<input
									type="checkbox"
									className=" w-6 h-6 border border-gray-300 rounded-sm  "
									checked={answerTypeTextArea}
									onChange={() => setAnswerTypeTextArea(!answerTypeTextArea)}
								/>
								<label className="text-gray-700">Text area</label>
							</div>
						</div>
						{errors.answerType && (
							<p className="text-red-500 text-sm">{errors.answerType}</p>
						)}
					</div>

					{/* Time Duration Selection */}
					{!isQusetionTimerEnable ? (
						<div className="flex flex-col gap-4">
							<label className="block text-gray-700">
								Choose time duration for every Question{' '}
								<span className="text-red-500">*</span>
							</label>
							<TimeDurationSelect onDataChange={onTimeChange} />
						</div>
					) : null}
					{/* Generate Button */}
					<div className="flex justify-end">
						<PrimaryButton
							disabled={loding}
							text={loding ? 'Loading...' : 'Generate'}
							onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AiGenerateQuestionPopup;
