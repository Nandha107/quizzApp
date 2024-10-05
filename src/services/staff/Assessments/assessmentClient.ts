import axios from 'axios';

export class AssessmentClient {
	static async getAssessment(AssessmentId: string) {
		try {
			if (!AssessmentId) return;
			const res = await axios.get<Assessments.GetAssessmentResponse>(
				`/tests/admin/${AssessmentId}`,
			);
			return res.data;
		} catch (error) {
			console.log('original error while getting assessment', error);

			throw error;
		}
	}

	static async getAssessmentAnalytics(AssessmentId: string) {
		try {
			if (!AssessmentId) return;
			const res = await axios.get<Assessments.AssessmentAnalytics>(
				`/tests/analytics/${AssessmentId}`,
			);
			return res.data;
		} catch (error) {
			console.log('original error while getting assessment analytics', error);

			throw error;
		}
	}

	static async getAllAssessments(course: string) {
		try {
			const res = await axios.get<Assessments.GetAssessmentResponse[]>(
				`/tests/category/${course}`,
			);
			return res.data;
		} catch (error) {
			console.log('original error while getting all assessments', error);

			throw error;
		}
	}

	static async createAssessment(body: Assessments.CreateAssessmentPayload) {
		try {
			const res = await axios.post<Assessments.GetAssessmentResponse>(`/tests`, body);
			// console.log({ ApiCreateTest: res });
			return res.data;
		} catch (error) {
			console.log('original error while creating assessment', error);
			console.log({ ApiCreateTest: error });

			throw error;
		}
	}

	static async updateAssessmentLevel(
		LevelId: string,
		body: Assessments.UpdateAssessmentLevelPayload,
	) {
		try {
			const res = await axios.put<Assessments.GetAssessmentResponse>(
				`/tests/levels/${LevelId}`,
				body,
			);
			// console.log({ ApiUpdateTest: res });
			return res.data;
		} catch (error) {
			console.log('original error while updating assessment', error);
			console.log({ ApiUpdateTest: error });

			throw error;
		}
	}

	static async getAssessmentLevel(levelId: string) {
		try {
			// console.log({ apiGet: levelId });
			const res = await axios.get<Assessments.QuestionsLevelResponse>(
				`/tests/levels/${levelId}`,
			);
			// console.log({ ApiGetLevelTest: res });
			return res.data;
		} catch (error) {
			console.log('original error while get assessment level', error);
			console.log({ ApiUpdateTest: error });

			throw error;
		}
	}

	// static async create(body: Campaign.createRequestParams) {
	// 	try {
	// 		const res = await axios.post<Campaign.prompt>(`/notify/v1/campaign`, body);
	// 		return res.data;
	// 	} catch (err: any) {
	// 		throw err;
	// 	}
	// }

	// static async clone(campaignId: string) {
	// 	try {
	// 		if (!campaignId) return;
	// 		const res = await axios.post<Campaign.prompt>(
	// 			`/notify/v1/duplicate_campaign/${campaignId}`,
	// 		);
	// 		return res.data;
	// 	} catch (error) {
	// 		console.log('original error while cloning campaign', error);

	// 		throw new Exception(error);
	// 	}
	// }

	// static async delete(campaignId: string) {
	// 	try {
	// 		if (!campaignId) return;
	// 		const res = await axios.put<Campaign.prompt>(
	// 			`/notify/v1/campaign_delete/${campaignId}`,
	// 		);
	// 		return res.data;
	// 	} catch (error) {
	// 		console.log('original error while deleting campaign', error);

	// 		throw error;
	// 	}
	// }

	// static async update(campaign_uuid: string, body: Campaign.updateRequestParams) {
	// 	try {
	// 		const res = await axios.put<Campaign.prompt>(
	// 			`/notify/v1/campaign_update/${campaign_uuid}`,
	// 			body,
	// 		);
	// 		return res.data;
	// 	} catch (err: any) {
	// 		console.log('original error while updating campaign', err);
	// 		throw err;
	// 	}
	// }
}
