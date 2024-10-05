import dayjs, { Dayjs } from 'dayjs';
import { AssessmentsStoreTypes } from '../../../../types/store/assessments';

export const AssessmentAdaptors = (
	params: Assessments.GetAssessmentResponse,
): AssessmentsStoreTypes.AssessmentData => {
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

	return {
		id: params.id,
		name: params.name,
		timerForWholeTest: params.timerForWholeTest,
		duration: {
			hours: params.duration.hours,
			minutes: params.duration.minutes,
			overAllSeconds: params.duration.overAllSeconds,
		},
		dateRange: {
			range: onDateRangeConvert(
				(params.startTime as number) * 1000,
				(params.endTime as number) * 1000,
			) as [Dayjs, Dayjs], // Call the function to convert epoch to Dayjs
			startTime: params.startTime as number,
			endTime: params.endTime as number,
		},
		levelsCount: params.levelsCount as number,
		instructions: {
			heading: params.instructions.heading,
			description: params.instructions.description,
		},
		levels: params.levels.map((level) => level),
		category: params.category,
		totalParticipants: params.totalParticipants,
		publish: params.publish,
	};
};
