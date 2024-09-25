interface Props extends React.SVGProps<SVGSVGElement> {}

export function PlusIcon(props: Props) {
	return (
		<svg
			{...props}
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.7857 9.96429H9.96429V14.7857C9.96429 15.3161 9.53036 15.75 9 15.75C8.46964 15.75 8.03571 15.3161 8.03571 14.7857V9.96429H3.21429C2.68393 9.96429 2.25 9.53036 2.25 9C2.25 8.46964 2.68393 8.03571 3.21429 8.03571H8.03571V3.21429C8.03571 2.68393 8.46964 2.25 9 2.25C9.53036 2.25 9.96429 2.68393 9.96429 3.21429V8.03571H14.7857C15.3161 8.03571 15.75 8.46964 15.75 9C15.75 9.53036 15.3161 9.96429 14.7857 9.96429Z"
				fill="currentColor"
			/>
		</svg>
	);
}
