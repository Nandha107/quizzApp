declare module AssessmentsStoreTypes {
	type CreateAssessment = CreateAssessmentProps & CreateAssessmentReducer;

	interface CreateAssessmentProps {
		name: string;
		timerForWholeTest: boolean;
		duration: number;
		startTime: number;
		endTime: number;
		instructions: string;
		category: string;
		levelsCount: number;
	}

	interface CreateAssessmentReducer {
		setCreateAssessment: (value: CreateAssessmentProps) => void;
	}
}
