import Select, { DefaultOptionType } from 'antd/es/select';

// Define the props interface for CustomSelect
interface CustomSelectProps {
	label?: string;
	id?: string;
	placeholder: string;
	isRequired?: boolean;
	htmlFor?: string;
	options: DefaultOptionType[];
	className?: string; // Add className here
	size?: 'small' | 'middle' | 'large'; // Add the size prop here
	onChange: (value: any) => void;
	value: string;
	suffixIcon?: React.ReactNode; // Add suffixIcon here
	style?: React.CSSProperties; // Add the style prop here
	dropdownStyle?: React.CSSProperties; // Add the dropdownStyle prop here
}

export const CustomizedSelect: React.FC<CustomSelectProps> = ({
	isRequired,
	id,
	label,
	value,
	placeholder,
	onChange,
	htmlFor,
	options,
	className,
	size,
	suffixIcon,
	dropdownStyle,
	style,
}) => {
	return (
		<div className="flex flex-col w-full gap-y-2">
			<label
				className="text-base text-secondary md:text-md flex gap-1"
				htmlFor={htmlFor}
			>
				{label}
				{isRequired && <span className="text-xl text-danger flex h-5">*</span>}
			</label>
			<div className="h-[3rem] md:h-[3.4rem] mt-1">
				<Select
					id={id}
					placeholder={placeholder}
					style={{ height: '100%', width: '100%', ...style }}
					options={options}
					size={size}
					className={`h-full w-full rounded-full  ${className}`}
					// menuItemSelectedIcon={<TickIcon />}
					value={value}
					suffixIcon={suffixIcon}
					dropdownStyle={{
						padding: '8px',
						borderRadius: '1rem',
						...dropdownStyle,
					}}
					onChange={onChange}
				/>
			</div>
		</div>
		// <div className="w-full flex flex-col gap-y-2">
		// 	{label && (
		// 		<label className="text-base text-gray-600 md:text-md flex gap-1">
		// 			{label}
		// 			{isRequired && <span className="text-xl text-red-600">*</span>}
		// 		</label>
		// 	)}
		//     <div className='h-[3.12rem] border-2 border-green-900'>
		//         <Select
		//             placeholder={placeholder}
		//             options={options}
		//             size={size}
		//             className={`w-full h-full border border-red-900 ${className}`}
		//             suffixIcon={suffixIcon} // Replace with your custom icon or remove if unnecessary
		//             style={{ height: '100%', width: '100%', ...style}}
		//             dropdownStyle={dropdownStyle}
		//             onChange={onChange}
		//         />
		//     </div>
		// </div>
	);
};
