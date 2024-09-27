interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	// ... your custom props here
}

export const PrimaryButton: React.FunctionComponent<ButtonProps> = ({
	icon,
	children,
	text,
	className,
	...rest
}) => {
	return (
		<button
			className={`btn btn-primary ${
				icon ? 'flex items-center gap-2' : ''
			}  bg-btn-gradient border border-teal-600 hover:border-teal-800 outline-none text-white gap-x-2 ${className}`}
			{...rest}
		>
			{icon}
			{children}
			{text}
		</button>
	);
};
