import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	isRequired?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, isRequired, label, ...rest }, ref) => {
		return (
			<div className="flex flex-col w-full h-full gap-y-2">
				{label && (
					<label>
						<strong>
							{label}
							{isRequired && <span className="text-xl text-error">*</span>}
						</strong>
					</label>
				)}
				<textarea
					ref={ref}
					className={`border resize-none min-h-[200px] max-h-[200px] w-full px-3 py-4 rounded-lg outline-none focus:border-primary ${className}`}
					{...rest}
				/>
			</div>
		);
	},
);
