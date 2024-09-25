interface Props extends React.SVGProps<SVGSVGElement> {}

export const DropDownArrow = (props: Props) => {
	return (
		<svg
			width="16"
			height="17"
			viewBox="0 0 16 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M2.72 6.46658L7.06667 10.8132C7.58 11.3266 8.42 11.3266 8.93333 10.8132L13.28 6.46658"
				stroke="#A7A1A1"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
