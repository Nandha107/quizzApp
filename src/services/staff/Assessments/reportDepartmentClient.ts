import axios from 'axios';
import toast from 'react-hot-toast';

export class ReportDepartmentClient {
	static async getReportDepartment(
		Dept: string,
		props: { page: string | number; limit: string | number; status: string },
	) {
		const params = props.status
			? `?department=${Dept}&page=${props.page}&limit=${props.limit}&status= ${props.status}`
			: `?department=${Dept}&page=${props.page}&limit=${props.limit}`;
		try {
			if (!Dept) return;
			const res = await axios.get(`/responses/analytics/department/` + params);
			return res.data;
		} catch (error) {
			toast.error('Error while getting student details, please try again');
			console.log('original error while getting student details', error);

			throw error;
		}
	}
}
