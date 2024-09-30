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
			}  bg-btn-gradient border border-teal-600 hover:border-teal-800 outline-none text-white gap-x-2 ${className}
				disabled:bg-gradient-to-br disabled:from-gray-300 disabled:to-gray-100 disabled:text-slate-400 disabled:border-gray-400
			`}
			{...rest}
		>
			{icon}
			{children}
			{text}
		</button>
	);
};
