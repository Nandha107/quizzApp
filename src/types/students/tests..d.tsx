export interface UseStudentsParams {
	studentId: string;
	category: 'EEE' | 'MECH' | 'ECE' | 'CIVIL' | 'CSE';
}
export type UserMark = {
	id: string; // Unique identifier for the user mark
};
export type Test = {
	id: string;
	name: string;
	timerForWholeTest: boolean;
	publish: boolean;
	duration: {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	};
	userMarks: UserMark[];
	instructions: string;
	category: string;
	levelsCount: number;
	startTime: number;
	endTime: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	totalParticipants: number;
	levels: Level[];
	totalQuestions: number;
	completed: boolean;
	totalMarksObtained: number;
	enableResponseReceiving: boolean;
	completedLevelIndexes: number[];
};

export type Level = {
	id: string;
	levelNo: number;
	levelName: string;
	testId: string;
	marks: number;
	minusMarks: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	questions: Question[];
	completed: boolean;
	correctAnswers: number;
	totalLevelMarks: number;
	levelScore: number;
};

export type Question = {
	id: string;
	question: string;
	questionType: 'CHOICE' | 'TEXTAREA';
	options: { value: string }[];
	answer: string;
	timer: {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	};
	levelId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

export type Response = {
	question: {
		answer: string;
	};
	studentId: string;
	selectedOption: string;
	isCorrect: boolean;
	questionId: string;
};

export type Levels = {
	levelName: string;
	levelNo: number;
	Response: Response[];
};

export type StudentResult = {
	studentId: string;
	levelId: string;
	id: string;
	score: number;
	totalQuestions: number;
	pass: boolean;
	percentage: number;
	userMarksId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	level: Levels;
};

export type LevelScore = {
	levelId: string;
	score: number;
	totalQuestions: number;
	percentage: number;
	responses: LevelResponse[];
	levelName: string;
};
export type LevelResponse = {
	questionId: string;
	studentId: string;
	selectedOption: string;
	correctAnswer: string;
	isCorrect: boolean;
};
export type UserMarks = {
	userMarksId: string;
	studentId: string;
	testId: string;
	marks: number;
	testName: string;
	pass: boolean;
	givenTime: { hours: number; minutes: number; overAllSeconds: number };
	timerForWholeTest: boolean;
	overallPercentage: number;
	timeTaken: number; // in seconds
	levelScores: LevelScore[];
};
export type ResponseType = {
	questionId: string; // UUID
	selectedOption: string;
};

export type CreateResponseType = {
	testId: string;
	levelId: string;
	studentId: string;
	timeTaken: number;
	responses: ResponseType[];
};
export type CreateAllLevelResponseType = {
	testId: string;
	studentId: string;
	timeTaken: number;
	responses: ResponseType[];
};
export type ResponseAllLevelType = {
	questionId: string; // UUID
	selectedOption: string;
	levelId: string;
};
export type StudentTestData = {
	studentName: string;
	registrationNumber: number;
	department: string;
	collegeName: string;
	totalTests: number;
	bendingTests: number;
	totalTestsTaken: number;
	passedTests: number;
	failedTests: number;
	totalScore: number;
	rank: number;
  };
  