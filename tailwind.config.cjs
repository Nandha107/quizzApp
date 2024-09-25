/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html"', './src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				danger: 'var(--danger-color)',
				headingPrimary: 'var(--text-heading-color)',
				paraPrimary: 'var(--text-para-primary-color)',
				paraSecondary: 'var(--text-para-secondary-color)',
				hoverPrimary: 'var(--hover)',
			},
			backgroundImage: {
				'btn-gradient': 'var(--btn-gradient)',
				'card-gradient': 'var(--card-gradient)',
				'text-gradient': 'var(--text-gradient)',
			},
			fontFamily: {
				poppins: ['Poppins'],
				// poppins: ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light'],
	},
};
