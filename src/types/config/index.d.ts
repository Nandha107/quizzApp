declare module ApplicationConfiguration {
	class Config {
		static localStorageKeys: localStorageKeys;

		static environment: environment;
	}

	interface environment {
		ENV_NAME: string;

		API_ENDPOINT: string;

		APP_URL: string;
	}

	interface localStorageKeys {
		access_token: string;
	}
}
