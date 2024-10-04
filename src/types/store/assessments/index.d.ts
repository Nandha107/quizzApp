import { Dayjs } from "dayjs";

export namespace AssessmentsStoreTypes {
	type AssessmentStore = AssessmentData & AssessmentStoreReducer;

	interface AssessmentData {
		id: string;
		name: string;
		timerForWholeTest: boolean;
		publish: boolean;
		duration: Duration;
		instructions: Instructions;
		category: string;
		levelsCount: number;
		dateRange: {
			range: [Dayjs | null, Dayjs | null]
			startTime: number;
			endTime: number;
		};
		totalParticipants: number;
		levels: Level[];
	}

	interface Duration {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	}

	interface Instructions {
		heading: string;
		description: string;
	}

	interface Level {
		id: string;
		levelNo: number;
		levelName: string;
		testId: string;
		marks: number;
		minusMarks: number;
		// createdAt: string;
		// updatedAt: string;
		// deletedAt: string;
		questions: Questions[];
	}

	interface Questions {
		id: string;
		question: string;
		// type: string;
		questionType: 'CHOICE' | 'TEXTAREA';
		options: { value: string }[];
		answer: string;
		timer: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		levelId: string;
		// createdAt: string;
		// updatedAt: string;
		// deletedAt: string;
	}

	interface AssessmentStoreReducer {
		setCreateAssessment: (value: AssessmentData) => void;

		populate: (props: Assessments.GetAssessmentResponse) => void;

		resetAssessmentStore: () => void;
	}

	// type CreateAssessment = CreateAssessmentProps & CreateAssessmentReducer;

	// interface CreateAssessmentProps {
	// 	name: string;
	// 	timerForWholeTest: boolean;
	// 	duration: number;
	// 	startTime: number;
	// 	endTime: number;
	// 	instructions: string;
	// 	category: string;
	// 	levelsCount: number;
	// }

	// interface CreateAssessmentReducer {
	// 	setCreateAssessment: (value: CreateAssessmentProps) => void;
	// }
}
