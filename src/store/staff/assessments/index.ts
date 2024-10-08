import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AssessmentsStoreTypes } from '../../../types/store/assessments';
import { AssessmentAdaptors } from './adoptor';

const initAssessmentStore: AssessmentsStoreTypes.AssessmentData = {
	id: '',
	name: '',
	category: '',
	timerForWholeTest: false,
	duration: {
		hours: 0,
		minutes: 0,
		overAllSeconds: 0,
	},
	dateRange: {
		range: [null, null],
		startTime: 0,
		endTime: 0,
	},
	instructions: {
		heading: '',
		description: '',
	},
	levelsCount: 1,
	publish: false,
	totalParticipants: 0,
	levels: [
		{
			id: '',
			levelNo: 1,
			levelName: '',
			testId: '',
			marks: 1,
			minusMarks: 1,
			questions: [
				{
					id: '',
					question: '',
					questionType: 'CHOICE',
					options: [],
					answer: '',
					timer: {
						hours: 0,
						minutes: 0,
						overAllSeconds: 0,
					},
					levelId: '',
					imageUrl: '',
					enableImage: false
				},
			],
		},
	],
};

export const assessmentStore = create<AssessmentsStoreTypes.AssessmentStore>()(
	devtools(
		(set): AssessmentsStoreTypes.AssessmentStore => ({
			...initAssessmentStore,
			setCreateAssessment(value) {
				set((state) => ({
					...state,
					...value,
				}));
			},
			populate: (props) => {
				set((state) => ({ ...state, ...AssessmentAdaptors(props) }));
			},
			resetAssessmentStore: () => {
				set({ ...initAssessmentStore });
			},
		}),
		{ name: 'AssessmentStore', enabled: import.meta.env.DEV },
	),
);
