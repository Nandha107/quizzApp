import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
	startTime: 0,
	endTime: 0,
	instructions: {
		heading: '',
		description: '',
	},
	levelsCount: 0,
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
					question: '',
					timer: {
						hours: 0,
						minutes: 0,
						overAllSeconds: 0,
					},
					type: '',
					options: [{ value: '' }],
					answer: '',
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
			// populate: (props) => {
			// 	set((state) => ({ ...state, ...AssessmentAdaptor(props) }));
			// },
			resetAssessmentStore: () => {
				set({ ...initAssessmentStore });
			},
		}),
		{ name: 'AssessmentStore', enabled: import.meta.env.DEV },
	),
);
