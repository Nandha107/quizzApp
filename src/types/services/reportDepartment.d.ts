declare module ReportDepartment {
	// Define types for the department analytics and student details
	interface TestResult {
		testName: string;
		pass: boolean;
		timeTaken: number;
		marks: number;
	}

	interface StudentDetails {
		studentName: string;
		registrationNumber: number;
		department: string;
		collegeName: string;
		testsTaken: number;
		testResults: TestResult[];
	}

	interface DepartmentAnalytics {
		department: string;
		totalStudents: number;
		totalTestsTaken: number;
		passedCount: number;
		failedCount: number;
		studentDetails: StudentDetails[];
		currentPage: number;
		totalPages: number;
	}

	interface TestResult {
		testName: string;
		pass: boolean;
		timeTaken: number;
		marks: number;
		levelScores: LevelScore[];
	}

	interface LevelScore {
		levelId: string;
		score: number;
		totalQuestions: number;
		percentage: number;
	}
}
