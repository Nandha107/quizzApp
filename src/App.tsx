import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
	// Create a client
	const queryClient = new QueryClient();

	document.addEventListener('touchmove', function (event) {
		event.preventDefault(); /* This prevents default swipe actions like pull-to-refresh */
	});

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{import.meta.env.DEV && (
				<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
			)}
		</QueryClientProvider>
	);
}

export default App;
