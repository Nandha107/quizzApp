import { InternalAxiosRequestConfig } from 'axios';
import { Config } from '../config';
import toast from 'react-hot-toast';

const url = Config.environment.API_ENDPOINT;

export const RequestInterceptor = (config: InternalAxiosRequestConfig) => {
	if (!window.navigator.onLine) {
		toast.error('Please check your internet connection, you might be offline.');
		throw new Error('No Internet connection.');
	}

	const accessToken = localStorage.getItem(Config.localStorageKeys.access_token);

	(config as any).headers.authorization = accessToken ? `Bearer ${accessToken}` : '';

	config.url = url + config.url;

	return config;

	// if (!window.navigator.onLine) {
	// 	toast.error('Please check your internet connection, you might be offline.');
	// 	throw new Error('No Internet connection.');
	// }

	// const accessToken = localStorage.getItem(Config.localStorageKeys.access_token);

	// if (!config?.headers?.Authorization) {
	// 	config.headers.Authorization = `Bearer ${accessToken}`!;
	// }

	// isRequestForPixabay(config.url as string)
	// 	? (config.url = config.url)
	// 	: isUrlContainHost(config.url ?? '')
	// 		? (config.url = config.url)
	// 		: (config.url = url + config.url);

	// return config;
};

// const isUrlContainHost = (url: string) => {
// 	return url.indexOf('http') === 0;
// };

// const isRequestForPixabay = (url: string): boolean => {
// 	const link = url.split('/')[2];

// 	return link.startsWith('pixabay') ? true : false;
// };

// export const onErrorResponseInterceptor = (error: any) => {
// 	if (error?.response?.data?.error?.name === 'UnauthorizedError') {
// 		window.location.replace('/');
// 		// window.location.replace('/logout');
// 	} else {
// 		return Promise.reject(error);
// 	}
// };

export const onErrorResponseInterceptor = (error: any) => {
	if (error.response.data.message === 'Unauthorized') {
		window.location.replace('/');
		// window.location.replace('/logout');
	} else {
		return Promise.reject(error);
	}
};
