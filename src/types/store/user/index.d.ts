declare module UserStoreTypes {
	type UserStore = UserStoreProps & UserStoreReducer;

	interface UserStoreProps {
		email: string;
		name: string;
		role: 'ADMIN' | 'STUDENT' | '';
	}

	interface UserStoreReducer {
		setUserStore: (value: UserStoreProps) => void;
	}
}
