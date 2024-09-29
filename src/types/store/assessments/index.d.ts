declare module AssessmentsStoreTypes {
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
		startTime: number;
		endTime: number;
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
		questions: Questions[];
	}

	interface Questions {
		question: string;
		timer: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		type: string;
		options: { value: string }[];
		answer: string;
	}

	interface AssessmentStoreReducer {
		setCreateAssessment: (value: AssessmentData) => void;

		// populate: (props: Campaign.prompt, source: string | number) => void;

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
