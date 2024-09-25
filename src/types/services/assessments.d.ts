declare module Assessments {
	interface GetAssessmentsResponse {
		id: string;
		name: string;
		timerForWholeTest: boolean;
		publish: boolean;
		duration: {
			hours: number;
			minutes: number;
			overAllSeconds: number;
		};
		instructions: string;
		category: string;
		levelsCount: number;
		totalQuestions: number;
		startTime: number | null;
		endTime: number | null;
		createdAt: string;
		updatedAt: string;
		deletedAt: string | null;
		totalParticipants: number;
		levels: QuestionsLevel[] | [];
	}

	interface QuestionsLevel {
		id: string;
		levelNo: number;
		levelName: string;
		testId: string;
		marks: number;
		minusMarks: number;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
		questions: Questions[] | [];
	}

	interface Questions {
		id: string;
		question: string;
		type: string;
		options: string[];
		answer: string;
		timer: number;
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
		duration: number;
		startTime: number;
		endTime: number;
		instructions: string;
		category: string;
		levelsCount: number;
	}

	interface CreateAssessmentResponse {
		id: string;
		name: string;
		timerForWholeTest: boolean;
		publish: boolean;
		duration: number;
		instructions: string;
		category: string;
		levelsCount: number;
		startTime: number | null;
		endTime: number | null;
		createdAt: string;
		updatedAt: string;
		deletedAt: string | null;
		totalParticipants: number;
		levels: QuestionsLevel[] | [];
	}
}
