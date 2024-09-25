import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
// import 'antd/dist/reset.css'; // Ant Design styles
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
	onErrorResponseInterceptor,
	RequestInterceptor,
} from './utils/axios-request-interceptors.ts';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) =>
	RequestInterceptor(config),
);

axios.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => onErrorResponseInterceptor(error),
);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
