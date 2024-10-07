import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend Day.js to use the duration plugin
dayjs.extend(duration);

export function convertMillisecondsToTimeOnly(milliseconds: number): string {
	// Create a Day.js duration object from the milliseconds
	const humanDuration = dayjs.duration(milliseconds);

	// Extract hours, minutes, and seconds
	const hours = Math.floor(humanDuration.asHours()); // Get total hours
	const minutes = humanDuration.minutes();
	const seconds = humanDuration.seconds();

	// Format the result
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`;
}
