import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initUserStore: UserStoreTypes.UserStoreProps = {
	email: '',
	name: '',
	role: '',
};

export const userStore = create<UserStoreTypes.UserStore>()(
	devtools(
		(set): UserStoreTypes.UserStore => ({
			...initUserStore,
			setUserStore(user) {
				set((state) => ({
					...state,
					...user,
				}));
			},
		}),
		{ name: 'UserStore', enabled: import.meta.env.DEV },
	),
);
