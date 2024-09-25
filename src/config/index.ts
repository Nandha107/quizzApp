import { betaConfig } from './environment/beta';
import { developmentConfig } from './environment/development';
import { productionConfig } from './environment/prod';

const environment = import.meta.env.VITE_APP_NODE_ENV;

const environmentConfig =
	environment === 'development'
		? developmentConfig
		: environment === 'beta'
			? betaConfig
			: productionConfig;

export class Config implements ApplicationConfiguration.Config {
	static localStorageKeys = {
		access_token: '_65tur_',
		dept: '_8d0_d',
		expireIn: '_exp',
	};

	static environment = {
		...environmentConfig,
	};
}
