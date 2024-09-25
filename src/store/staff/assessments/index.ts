import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initAssessmentStore: AssessmentsStoreTypes.CreateAssessmentProps = {
	name: '',
	category: '',
	timerForWholeTest: false,
	duration: 0,
	startTime: 0,
	endTime: 0,
	instructions: '',
	levelsCount: 0,
};

export const userStore = create<AssessmentsStoreTypes.CreateAssessment>()(
	devtools(
		(set): AssessmentsStoreTypes.CreateAssessment => ({
			...initAssessmentStore,
			setCreateAssessment(user) {
				set((state) => ({
					...state,
					...user,
				}));
			},
		}),
		{ name: 'UserStore', enabled: import.meta.env.DEV },
	),
);
