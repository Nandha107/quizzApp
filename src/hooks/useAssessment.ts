import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { AssessmentClient } from '../services/staff/Assessments/assessmentClient';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { assessmentStore } from '../store/staff/assessments';

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

	const queryClient = new QueryClient();

	const getAllAssessments = useQuery({
		queryKey: ['allAssessments', JSON.stringify(course)],
		queryFn: () => AssessmentClient.getAllAssessments(course!),
		staleTime: 600000,
		enabled: Boolean(course) && Boolean(!assessmentId),
	});

	const getAssessment = useQuery({
		queryKey: ['getAssessment', assessmentId!],
		queryFn: () => AssessmentClient.getAssessment(assessmentId!),
		staleTime: 600000,
		enabled: Boolean(assessmentId) && Boolean(!course),
	});

	const getAssessmentLevel = useQuery({
		queryKey: ['getAssessmentLevel', levelId!],
		queryFn: () => AssessmentClient.getAssessmentLevel(levelId!),
		staleTime: 600000,
		enabled: Boolean(levelId),
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
				queryKey: ['allAssessments', JSON.stringify(course)],
				exact: true, // Optional, if you want to match the exact key
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
			queryClient.invalidateQueries({
				queryKey: ['getAssessment'],
				exact: true, // Optional, if you want to match the exact key
			});
			queryClient.invalidateQueries({
				queryKey: ['allAssessments', JSON.stringify(course)],
				exact: true, // Optional, if you want to match the exact key
			});
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to Update a Assessment, please try again',
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
		getAssessmentLevel,
	};
};
