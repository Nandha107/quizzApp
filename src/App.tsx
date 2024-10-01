import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes';

function App() {
	// Create a client
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{/* <RouterProvider router={router} /> */}
			<AppRouter/>
			{import.meta.env.DEV && (
				<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
			)}
		</QueryClientProvider>
	);
}

export default App;
