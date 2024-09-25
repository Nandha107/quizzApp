import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	isRequired?: boolean;
	htmlFor?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, isRequired, label, htmlFor, ...rest }, ref) => {
		return (
			<div className={`flex flex-col gap-y-2 w-full ${className}`}>
				{label && (
					<label
						className="text-base text-secondary md:text-md flex gap-1"
						htmlFor={htmlFor}
					>
						{label}
						{isRequired && <span className="text-xl text-danger">*</span>}
					</label>
				)}
				<div className="relative w-full">
					<input
						ref={ref}
						className={`w-full px-5 py-3 md:py-4 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-600 `}
						{...rest}
						required={isRequired}
					/>
				</div>
			</div>
		);
	},
);
