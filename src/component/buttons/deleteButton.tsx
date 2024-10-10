import React, { Fragment } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Tooltip } from 'antd';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: string;
	loadingText?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	loader?: boolean;
	svg?: React.ReactNode;
	disabled?: boolean;
	tooltipTitle?: string;
	// ... your custom props here
}

export const DeleteButton: React.FunctionComponent<ButtonProps> = ({
	icon,
	children,
	svg,
	text,
	loadingText,
	className,
	loader,
	disabled = false,
	tooltipTitle,
	...rest
}) => {
	return (
		<Tooltip title={tooltipTitle}>
			<button
				className={` btn border-red-500 hover:bg-red-200 hover:border-red-200 bg-transparent text-error ${className}`}
				{...rest}
				disabled={loader || disabled}
			>
				{icon}
				{loader ? null : svg}
				{children}
				{loader ? (
					<Fragment>
						<CgSpinner className=" animate-spin text-white" />
						<span className="text-white">
							{loadingText === '' ? 'loading...' : loadingText}
						</span>
					</Fragment>
				) : (
					text
				)}
			</button>
		</Tooltip>
	);
};
