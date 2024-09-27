import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
	UseStudentsParams,
	Test,
	CreateResponseType,
	CreateAllLevelResponseType,
	UserMarks,
	StudentResult,
} from '../../../types/students/tests..d';
export function useStudents() {
	const queryClient = useQueryClient();

	const tests = ({ category, studentId }: UseStudentsParams) =>
		useQuery({
			queryKey: ['tests-students', studentId, category],
			queryFn: async () => {
				try {
					const response = await axios.get(
						`/tests/student/${studentId}/${category}`,
						{},
					);
					return response.data as Test[];
				} catch (error) {
					console.error('Error fetching tests for student:', error);
					throw error;
				}
			},
			enabled: Boolean(category && studentId),
			staleTime: 30000,
		});
	const getTestById = (testId: string, studentId: string) =>
		useQuery({
			queryKey: ['test', testId, studentId],
			queryFn: async () => {
				try {
					const response = await axios.get(
						`/tests/student-test/${studentId}/${testId}/`,
					);
					console.log(response.data);
					return response.data as Test;
				} catch (error) {
					console.error('Error fetching test by ID:', error);
					throw error;
				}
			},
			enabled: Boolean(testId),
			staleTime: 30000,
		});

	const getLevelByTestId = (testId: string) =>
		useQuery({
			queryKey: ['test', testId],
			queryFn: async () => {
				try {
					const response = await axios.get(`/tests/${testId}/levels`);
					return response.data;
				} catch (error) {
					console.error('Error fetching levels for test:', error);
					throw error;
				}
			},
			enabled: Boolean(testId),
			staleTime: 30000,
		});
	const getLevelById = (levelId: string) =>
		useQuery({
			queryKey: ['test', levelId],
			queryFn: async () => {
				try {
					const response = await axios.get(`/tests/levels/${levelId}`);
					return response.data;
				} catch (error) {
					console.error('Error fetching level by ID:', error);
					throw error;
				}
			},
			enabled: Boolean(levelId),
			staleTime: 30000,
		});
	const CreateResponse = useMutation({
		mutationFn: async (responseData: CreateResponseType) => {
			try {
				const response = await axios.post('/responses/create', responseData);
				return response.data;
			} catch (error) {
				console.error('Error creating response:', error);
				throw error;
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['level-scores'] });
		},
	});

	const CreateAllLevelResponse = useMutation({
		mutationFn: async (responseData: CreateAllLevelResponseType) => {
			try {
				const response = await axios.post('/responses/create/all-level', responseData);
				return response.data;
			} catch (error) {
				console.error('Error creating response:', error);
				throw error;
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['level-scores'] });
		},
	});
	//result for all levels
	const useUserMarks = (userMarksId: string, studentId: string) => {
		return useQuery({
			queryKey: ['userMarks', userMarksId, studentId],
			queryFn: async () => {
				try {
					const response = await axios.get(`/responses/result`, {
						params: { userMarksId, studentId },
					});
					return response.data as UserMarks;
				} catch (error) {
					throw error;
				}
			},
			enabled: !!userMarksId && !!studentId,
			staleTime: 300000,
		});
	};

	const getResultByLevel = (levelId: string, studentId: string) =>
		useQuery({
			queryKey: ['level-scores', levelId, studentId],
			queryFn: async () => {
				try {
					const response = await axios.get(`/responses/level/scores`, {
						params: { levelId, studentId },
					});
					return response.data as StudentResult;
				} catch (error) {
					throw error;
				}
			},
			retry: false,
			enabled: !!levelId && !!studentId,
			staleTime: 600000,
		});
	return {
		tests,
		CreateResponse,
		getResultByLevel,
		getTestById,
		getLevelByTestId,
		getLevelById,
		useUserMarks,
		CreateAllLevelResponse,
		queryClient,
	};
}
