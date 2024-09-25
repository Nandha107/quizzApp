import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	// ... your custom props here
}
export const PrimaryOutlineButton: React.FunctionComponent<ButtonProps> = ({
	icon,
	children,
	text,
	className,
	...rest
}) => {
	return (
		<button
			className={`btn btn-outline bg-white rounded-md ${
				icon ? 'flex items-center gap-2' : ''
			} hover:bg-hoverPrimary hover:text-primary hover:border-primary border-primary text-primary ${className} gap-x-2`}
			{...rest}
		>
			{icon}
			{children}
			{text}
		</button>
	);
};
