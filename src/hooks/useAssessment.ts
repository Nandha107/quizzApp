import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AssessmentClient } from '../services/staff/Assessments/assessmentClient';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { assessmentStore } from '../store/staff/assessments';
import axios from 'axios';
import GenerativeAI from '../utils/gemini-ai';

export const useAssessments = ({
	course,
	assessmentId,
	levelId,
}: {
	course?: string;
	assessmentId?: string;
	levelId?: string;
}) => {
	const storeAssessment = assessmentStore();

	const queryClient = useQueryClient();

	const getAllAssessments = useQuery({
		queryKey: ['allAssessments', course],
		queryFn: () => AssessmentClient.getAllAssessments(course!),
		staleTime: 600000,
		enabled: Boolean(course),
	});

	const getAssessment = useQuery({
		queryKey: ['getAssessment', assessmentId!],
		queryFn: () => AssessmentClient.getAssessment(assessmentId!),
		staleTime: 600000,
		enabled: Boolean(assessmentId),
	});

	const getAssessmentLevel = useQuery({
		queryKey: ['getAssessmentLevel', levelId!],
		queryFn: () => AssessmentClient.getAssessmentLevel(levelId!),
		staleTime: 600000,
		enabled: Boolean(levelId) && Boolean(assessmentId),
	});

	const getAssessmentAnalytics = useQuery({
		queryKey: ['getAssessmentAnalytics', assessmentId!],
		queryFn: () => AssessmentClient.getAssessmentAnalytics(assessmentId!),
		staleTime: 600000,
		enabled: Boolean(assessmentId) && Boolean(course),
	});

	const createAssessment = useMutation({
		mutationFn: (body: Assessments.CreateAssessmentPayload) =>
			AssessmentClient.createAssessment(body),
		onSuccess: () => {
			toast.success('Assessment has successfully Created...');
			queryClient.invalidateQueries({
				queryKey: ['allAssessments', course],
			});
			queryClient.invalidateQueries({
				queryKey: ['getAssessment'],
			});
			// queryClient.invalidateQueries(['allAssessments', JSON.stringify(course)] as any);
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to Create a Assessment, please try again',
			);
		},
	});

	const updateAssessment = useMutation({
		mutationFn: (payload: {
			levelId: string;
			body: Assessments.UpdateAssessmentLevelPayload;
		}) => AssessmentClient.updateAssessmentLevel(payload.levelId, payload.body),
		onSuccess: () => {
			toast.success('Assessment has successfully updated...');
			queryClient.invalidateQueries({ queryKey: ['getAssessment', assessmentId!] });
			queryClient.invalidateQueries({
				queryKey: ['allAssessments', course],
			});
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to Update a Assessment, please try again',
			);
		},
	});

	const updateAssessmentConfig = useMutation({
		mutationFn: (payload: {
			assessmentId: string;
			body: Assessments.updateAssessmentConfig;
		}) => AssessmentClient.updateAssessmentConfig(payload.assessmentId, payload.body),
		onSuccess: () => {
			toast.success('Assessment has successfully updated...');
			queryClient.invalidateQueries({
				queryKey: ['allAssessments', course],
			});
			queryClient.invalidateQueries({ queryKey: ['getAssessment', assessmentId!] });
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to Update a Assessment, please try again',
			);
		},
	});

	const deleteAssessment = useMutation({
		mutationFn: (assessmentId: string) => AssessmentClient.deleteAssessment(assessmentId),
		onSuccess: () => {
			toast.success('Assessment has successfully deleted...');
			queryClient.invalidateQueries({
				queryKey: ['allAssessments', course],
			});
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to delete a Assessment, please try again',
			);
		},
	});

	// const getAssessmentLevel = useMutation({
	// 	mutationFn: (payload: { levelId: string }) =>
	// 		AssessmentClient.getAssessmentLevel(payload.levelId),
	// 	onSuccess: () => {
	// 		toast.success('Assessment has successfully updated...');
	// 		queryClient.invalidateQueries({
	// 			queryKey: ['getAssessmentLevel'],
	// 			exact: true, // Optional, if you want to match the exact key
	// 		});
	// 	},
	// 	onError: (error) => {
	// 		toast.error(
	// 			error.message ?? 'Sorry, Failed to Update a Assessment, please try again',
	// 		);
	// 	},
	// });
	const uploadImage = useMutation({
		mutationFn: async (param: { file: FormData }) => {
			try {
				// console.log(param);
				const res = await axios.post<any>(`/tests/upload-image`, param.file);
				return res.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		onSuccess: () => {
			console.log('image uploaded successfully...');
			// queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
		},
		onError: (error) => {
			toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
		},
	});
	const updateImage = useMutation({
		mutationFn: async (param: { file: FormData; oldKey: string }) => {
			try {
				// console.log(param);
				const res = await axios.put<any>(`/tests/update/image`, param.file, {
					params: {
						oldKey: param.oldKey,
					},
				});
				return res.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		onSuccess: () => {
			console.log('uploaded image updated successfully...');
			// queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
		},
		onError: (error) => {
			toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
		},
	});
	const deleteImage = useMutation({
		mutationFn: async (param: { fileKey: string }) => {
			try {
				// console.log(param);
				const res = await axios.delete<any>(`/tests/delete/image`, { params: param });
				return res.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		onSuccess: () => {
			console.log('uploaded deleted successfully...');
			// queryClient.invalidateQueries({ queryKey: ['getAssessment'] });
		},
		onError: (error) => {
			toast.error(error.message ?? 'Sorry, Failed to Update a image please try again');
		},
	});

	const generateAiQuestions = useMutation({
		mutationFn: async (param: { prompt: string }) => {
			try {
				// console.log(param.prompt);
				const res = await GenerativeAI.generateContent(param.prompt);

				return res;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['ai-questions'] });
			toast.success('Generate ai support questions successfully :)');
		},
		onError: (error) => {
			toast.error(
				error.message ??
					'Sorry, Failed to Generate ai support questions please try again',
			);
		},
	});
	useEffect(() => {
		if (getAssessment.data && assessmentId) {
			storeAssessment.populate({ ...getAssessment.data });
		}
	}, [JSON.stringify(getAssessment.data), assessmentId]);

	return {
		getAllAssessments,
		getAssessment,
		getAssessmentAnalytics,
		createAssessment,
		updateAssessment,
		updateAssessmentConfig,
		deleteAssessment,
		getAssessmentLevel,
		uploadImage,
		updateImage,
		deleteImage,
		generateAiQuestions,
		queryClient
	};
};
