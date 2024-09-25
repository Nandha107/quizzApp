import { forwardRef } from 'react';
import { DropDown } from '../dropdown';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface dropdownOptions {
	label: string;
	value: string;
	key: string;
}

interface InputGroup {
	input: InputProps;
	option: dropdownOptions[];
	text?: string;
	label?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	activeOption: string;
	onOptionSelect: (option: dropdownOptions) => void;
}

export const InputWithSelector = forwardRef<HTMLInputElement, InputGroup>(
	({ input, label, option, activeOption, onOptionSelect }, ref) => {
		return (
			<div className="form-control relative">
				<div className="font-medium">
					{label && (
						<label className="text-sm text-gray-500" htmlFor="assessment_name">
							{label}
						</label>
					)}
				</div>
				<div className="input-group">
					<div className="flex items-stretch w-full mt-1">
						<input
							ref={ref}
							className={`w-full px-5 py-2 text-sm border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-teal-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${input.className}`}
							{...input}
						/>
						<div>
							<DropDown
								className="border-l-0 rounded-l-none"
								activeOption={activeOption}
								options={option}
								onOptionSelect={onOptionSelect}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
