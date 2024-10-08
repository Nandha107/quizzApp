import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

// Define the type of props for the Child component
interface ChildProps {
	onDataChange: (data: { hours: string; minutes: string }) => void; // 'onDataChange' is a function that takes a string and returns void
}

const TimeDurationSelect: React.FC<ChildProps> = ({ onDataChange }) => {
	const [timeDuration, setTimeDuration] = useState({
		hours: '0',
		minutes: '1',
	});

	useEffect(() => {
		onDataChange(timeDuration);
		// console.log(
		// 	`Selected Duration: ${timeDuration.hours} hours and ${timeDuration.minutes} minutes`,
		// );
		return;
	}, [timeDuration]);

	return (
		<div className="flex items-center h-[3rem] md:h-[3.3rem] justify-between md:justify-start md:gap-3">
			<Select
				value={timeDuration.hours}
				variant="borderless"
				onChange={(value: string) => {
					setTimeDuration({
						...timeDuration,
						hours: value,
					});
				}}
				className="border border-gray-300 h-full w-[40%] md:w-[30%] rounded-full flex"
				popupMatchSelectWidth={false}
				suffixIcon={false}
				style={{ paddingLeft: 10, paddingRight: 10 }}
			>
				{Array.from({ length: 24 }, (_, index) => (
					<Option key={index} value={index.toString()}>
						{index} hours
					</Option>
				))}
			</Select>
			<span className="">:</span>
			<Select
				value={timeDuration.minutes}
				onChange={(value: string) => {
					setTimeDuration({
						...timeDuration,
						minutes: value,
					});
				}}
				variant="borderless"
				className="border border-gray-300 h-full w-[40%] md:w-[30%] rounded-full"
				popupMatchSelectWidth={false}
				suffixIcon={false}
				style={{ paddingLeft: 10, paddingRight: 10 }}
			>
				{/* {[0, 15, 30, 45].map((minute) => ( */}
				{Array.from({ length: 59 }, (_, minute) => (
					<Option key={minute + 1} value={(minute + 1).toString()}>
						{minute + 1} minutes
					</Option>
				))}
			</Select>
		</div>
	);
};

export default TimeDurationSelect;
