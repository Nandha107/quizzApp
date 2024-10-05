import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
// import { PrimaryOutlineButton } from '../buttons/primaryOutlineButton';
// import { FaRegClock } from 'react-icons/fa';

const { Option } = Select;

// Define the type of props for the Child component
interface ChildProps {
	onDataChange: (data: { hours: string; minutes: string }) => void; // 'onDataChange' is a function that takes a string and returns void
	// reset: boolean;
}

const TimeDurationSelect: React.FC<ChildProps> = ({ onDataChange }) => {
	const [timeDuration, setTimeDuration] = useState({
		hours: '0',
		minutes: '0',
	});

	useEffect(() => {
		onDataChange(timeDuration);
		console.log(
			`Selected Duration: ${timeDuration.hours} hours and ${timeDuration.minutes} minutes`,
		);
		return;
	}, [timeDuration]);

	// useEffect(() => {
	// 	if(reset){
	// 		setTimeDuration({ hours: '0', minutes: '0' });
    //         onDataChange(timeDuration);
    //         console.log('Resetting Time Duration');
            // reset = false; // reset the state variable to false after resetting the time duration.
		// }
	// }, [reset]);
	

	// const handleSetTimeDuration = () => {
	// 	console.log(
	// 		`Selected Duration: ${timeDuration.hours} hours and ${timeDuration.minutes} minutes`,
	// 	);
	// 	onDataChange(timeDuration);
	// };

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
				{[0, 15, 30, 45].map((minute) => (
					<Option key={minute} value={minute.toString()}>
						{minute} minutes
					</Option>
				))}
			</Select>
			{/* <PrimaryOutlineButton
				icon={<FaRegClock />}
				text="Set Timer"
				type="button"
				onClick={handleSetTimeDuration}
				className={`${timeDuration.hours === '0' && timeDuration.minutes === '0' ? 'hover:cursor-not-allowed' : ''}`}
				disabled={timeDuration.hours === '0' && timeDuration.minutes === '0'}
			/> */}
		</div>
	);
};

export default TimeDurationSelect;
