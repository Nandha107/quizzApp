declare module Assessments {
	interface GetAssessmentResponse {
		id: string;
		name: string;
		timerForWholeTest: boolean;
		publish: boolean;
		duration: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		instructions: {
			heading: string;
			description: string;
		};
		category: string;
		levelsCount: number;
		totalQuestions: number;
		startTime: number | null;
		endTime: number | null;
		createdAt: string;
		updatedAt: string;
		deletedAt: string | null;
		totalParticipants: number;
		levels: QuestionsLevelResponse[] | [];
	}

	interface QuestionsLevelResponse {
		id: string;
		levelNo: number;
		levelName: string;
		testId: string;
		marks: number;
		minusMarks: number;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
		questions: QuestionsResponse[] | [];
	}

	interface QuestionsResponse {
		id: string;
		question: string;
		type: CHOICE | TEXTAREA;
		options: string[];
		answer: string;
		timer: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		levelId: string;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
	}

	interface AssessmentAnalytics {
		testId: string;
		testName: string;
		totalQuestions: number;
		totalCorrectAnswers: number;
		totalWrongAnswers: number;
		levels: number;
		passCount: number;
		failCount: number;
	}

	// interface AssessmentAnalyticsLevel {
	// 	levelId: string;
	// 	levelName: string;
	// 	totalQuestions: number;
	// 	correctAnswers: number;
	// 	wrongAnswers: number;
	// 	marksObtained: number;
	// 	totalMarks: number;
	// 	passPercentage: number;
	// 	pass: boolean;
	// }

	interface CreateAssessmentPayload {
		name: string;
		timerForWholeTest: boolean;
		duration: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		startTime: number;
		endTime: number;
		instructions: {
			heading: string;
			description: string;
		};
		category: string;
		levelsCount: number;
	}

	interface CreateAssessmentResponse {
		id: string;
		name: string;
		timerForWholeTest: boolean;
		publish: boolean;
		duration: number;
		instructions: {
			heading: string;
			description: string;
		};
		category: string;
		levelsCount: number;
		startTime: number | null;
		endTime: number | null;
		createdAt: string;
		updatedAt: string;
		deletedAt: string | null;
		totalParticipants: number;
		levels: QuestionsLevelResponse[] | [];
	}

	interface UpdateAssessmentLevelPayload {
		levelNo: number;
		levelName: string;
		marks: number;
		minusMarks: number;
		questions: QuestionPayload[];
	}

	interface QuestionPayload {
		question: string;
		type: CHOICE | TEXTAREA;
		options: { value: string }[];
		answer: string;
		timer: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
	}
}
