import { useMutation, useQuery } from '@tanstack/react-query';
import { AssessmentClient } from '../services/staff/Assessments/assessmentClient';
import toast from 'react-hot-toast';

export const useAssessments = ({
	course,
	assessmentId,
}: {
	course?: string;
	assessmentId?: string;
}) => {
	const getAllAssessments = useQuery({
		queryKey: ['allAssessments', JSON.stringify(course)],
		queryFn: () => AssessmentClient.getAllAssessments(course!),
		staleTime: 600000,
		enabled: Boolean(course),
	});

	const getAssessment = useQuery({
		queryKey: ['getAssessment', assessmentId!],
		queryFn: () => AssessmentClient.getAssessment(assessmentId!),
		staleTime: 600000,
		enabled: Boolean(assessmentId && course),
	});

	const getAssessmentAnalytics = useQuery({
		queryKey: ['getAssessmentAnalytics', assessmentId!],
		queryFn: () => AssessmentClient.getAssessmentAnalytics(assessmentId!),
		staleTime: 600000,
		enabled: Boolean(assessmentId),
	});

	const createAssessment = useMutation({
		mutationFn: (body: Assessments.CreateAssessmentPayload) =>
			AssessmentClient.createAssessment(body),
		onSettled: (res) => {
			toast.success('Assessment has successfully Created...');
		},
		onError: (error) => {
			toast.error(
				error.message ?? 'Sorry, Failed to Create a Assessment, please try again',
			);
		},
	});

	return { getAllAssessments, getAssessment, getAssessmentAnalytics, createAssessment };
};
