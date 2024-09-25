import { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutSide';
import { DropDownArrow } from '../../assets/svg/dropdownArrow';

export type DropDownOption = {
	label: string;
	key: string;
	value: string;
};

type Props = {
	activeOption: string;
	className?: string;
	options: DropDownOption[];
	height?: string;
	disable?: boolean;
	size?: string;
	width?: String;
	onOptionSelect: (option: DropDownOption) => void;
	placeholder?: string;
};

export const DropDown: React.FC<Props> = ({
	activeOption,
	options,
	className,
	size,
	height = '',
	disable = false,
	width = 'full',
	onOptionSelect,
	placeholder,
}) => {
	const [show, setShow] = useState(false);

	const clickOutside = useClickOutside(() => {
		if (show) setShow(false);
	});

	const onClick = () => {
		if (!disable) setShow(!show);
	};

	return (
		<div
			ref={clickOutside}
			onClick={() => onClick()}
			className={`border ${
				show ? 'border-teal-600' : 'border-gray-300 '
			} text-black rounded-lg relative flex text-clip ${height} items-center ${size} justify-between 
                h-full w-${width} bg-white cursor-pointer ${className}
            `}
		>
			<div className="flex p-2 gap-3">
				<div className={`flex gap-2 items-center text-sm truncate rounded-r-full`}>
					{!activeOption ? (
						<span className="text-gray-400 text-xs">{placeholder}</span>
					) : activeOption.length > 10 ? (
						`${activeOption.slice(0, 20)}...`
					) : (
						` ${activeOption}`
					)}
				</div>
				<div className={`transition-all duration-300 flex gap-2`}>
					<DropDownArrow />
				</div>
			</div>

			{show ? (
				<div className="absolute z-[10001] bg-white bottom-12 my-2 border rounded-lg w-full shadow-lg max-h-[60vh]">
					<div
						className={`py-2 relative transition-all duration-300 overflow-y-auto max-h-[45vh]   
                                         rounded-b-lg w-full overflow-x-hidden
                    `}
						style={{
							maxHeight: height,
						}}
					>
						{options.map((option: DropDownOption) => {
							return (
								<div
									key={option.key}
									onClick={() => onOptionSelect(option)}
									className={`
                                    ${
										option.label === activeOption
											? 'bg-blue-600 text-white hover:bg-blue-600'
											: ''
									}    
                                    px-4 py-2 text-sm hover:bg-blue-100 flex items-center gap-4
                                `}
								>
									<div className="">
										<div>{option.label}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};
