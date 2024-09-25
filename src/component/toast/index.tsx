import { Toaster } from 'react-hot-toast';

export const Toast: React.FC = () => {
	return (
		<Toaster
			position="top-center"
			toastOptions={{
				// className: ' p-3 shadow-xl  border  max-w-4xl',
				style: {
					padding: '0.75rem',
					borderWidth: '1px',
					maxWidth: '56rem',
					boxShadow:
						'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
					border: 'none',
				},
				success: {
					// className: ' bg-green-700 text-white',
					style: { color: '#ffffff', backgroundColor: '#047857', border: 'none' },
					duration: 1500,
					// duration: 5000,
					iconTheme: {
						primary: 'white',
						secondary: 'black',
					},
				},
				loading: {
					duration: undefined,
					// className: ' bg-blue-700 text-white',
					style: { color: '#ffffff', backgroundColor: '#1D4ED8', border: 'none' },
					iconTheme: {
						primary: 'blue',
						secondary: 'white',
					},
				},
				error: {
					duration: 5000,
					// duration: 10000,
					// className: ' bg-red-700 text-white',
					style: { color: '#ffffff', backgroundColor: '#B91C1C', border: 'none' },
					iconTheme: {
						primary: 'white',
						secondary: 'black',
					},
				},
			}}
		/>
	);
};
