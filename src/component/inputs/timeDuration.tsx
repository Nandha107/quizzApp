import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface TimePickerProps {
	onChange?: (time: { hours: number; minutes: number }) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
	const [selectedTime, setSelectedTime] = useState({ hours: 0, minutes: 0 });

	const handleTimeChange = (value: number, type: 'hours' | 'minutes') => {
		const updatedTime = { ...selectedTime, [type]: value };
		setSelectedTime(updatedTime);
		if (onChange) {
			onChange(updatedTime);
		}
	};

	return (
		<div className="border border-gray-300 shadow-sm rounded-full bg-white flex items-center w-full">
			{/* Display Selected Time */}
			{/* <div className="mb-4 text-lg text-gray-800">
          {selectedTime.hours.toString().padStart(2, '0')}h:
          {selectedTime.minutes.toString().padStart(2, '0')}m
        </div> */}

			{/* Hours Select */}
			{/* <label className="block mb-2 text-sm font-medium text-gray-700">
            Hours
          </label> */}
			<Select
				className="border-gray-300 rounded-lg focus:ring-teal-500 min-h-[3.5rem] max-h-[3.5rem]"
				value={selectedTime.hours}
				onChange={(value) => handleTimeChange(value, 'hours')}
			>
				{Array.from({ length: 24 }, (_, i) => (
					<Option key={i} value={i}>
						{i.toString().padStart(2, '0')}
					</Option>
				))}
			</Select>

			{/* Minutes Select */}
			{/* <label className="block mb-2 text-sm font-medium text-gray-700">
            Minutes
          </label> */}
			<Select
				className="w-full border-gray-300 rounded-lg focus:ring-teal-500"
				value={selectedTime.minutes}
				onChange={(value) => handleTimeChange(value, 'minutes')}
			>
				{Array.from({ length: 60 }, (_, i) => (
					<Option key={i} value={i}>
						{i.toString().padStart(2, '0')}
					</Option>
				))}
			</Select>
		</div>
	);
};

export default TimePicker;
