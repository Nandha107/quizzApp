import { useQuery } from '@tanstack/react-query';
import { ReportDepartmentClient } from '../services/staff/Assessments/reportDepartmentClient';

export const useReportDepartment = ({
	course,
	page,
	limit,
	status,
}: {
	course: string;
	page: string | number;
	limit: string | number;
	status?: string;
}) => {
	const getReportDepartment = useQuery({
		queryKey: ['reportsDepartment', JSON.stringify(course)],
		queryFn: () =>
			ReportDepartmentClient.getReportDepartment(course, {
				page: page,
				limit: limit,
				status: status ? status : '',
			}),
		staleTime: 600000,
		enabled: Boolean(course),
	});

	return { getReportDepartment };
};
