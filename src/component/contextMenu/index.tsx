import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { Switch } from 'antd';
import { useClickOutside } from '../../hooks/useClickOutSide';
import { usePopper } from 'react-popper';
import { FaEllipsisV } from 'react-icons/fa';

type DropDownOption = {
	label?: string;
	type?: any;
	svg?: any;
	subLabel?: string;
	id?: string;
	possible?: boolean;
};

interface SettingsDropdownProps {
	DropDownObjects: any;
	onOptionSelect: (option: DropDownOption) => void;
	onChange: () => void;
	onClickIcon?: () => void;
	toggle: boolean;
	toggleChecked?: boolean;
	width?: string;
	margin?: string;
}

const DropDownObjectsDefault = [
	{
		svg: <BsBoxArrowInUpRight />,
		label: 'View',
		key: 'view',
	},
	{
		svg: <AiOutlineDelete />,
		label: 'Delete',
		key: 'delete',
	},
];

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
	DropDownObjects = DropDownObjectsDefault,
	onOptionSelect,
	onChange,
	onClickIcon,
	toggle = true,
	toggleChecked = true,
	width = 'w-40',
	margin = 'mt-2 -ml-20 ',
}) => {
	const [open, setOpen] = useState(false);

	const clickOutSideRef = useClickOutside(() => setOpen(false));

	const [menuButtonRef, setMenuButtonRef] = useState<any>({});

	const [menuRef, setMenuRef] = useState<any>({});

	const { styles, attributes } = usePopper(menuButtonRef, menuRef, {
		placement: 'left-start',
	});

	const handleOpen = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<div className="relative cursor-pointer rounded-full" ref={clickOutSideRef}>
			{/* <div
				ref={setMenuButtonRef}
				className={`${open ? 'bg-blue-200' : 'bg-white'} p-2 rounded-full text-black hover:bg-blue-100`}
				onClick={(e) => {
					e.stopPropagation();
					onClickIcon;
					handleOpen();
				}}
			>
				{list === 'list' ? <BsThreeDotsVertical /> : <FiSettings />}
			</div> */}
			<div
				ref={setMenuButtonRef}
				className={`${open ? 'bg-teal-600/75' : 'bg-teal-600/30'} border border-primary p-2 rounded-md cursor-pointer`}
				onClick={(e) => {
					e.stopPropagation();
					onClickIcon;
					handleOpen();
				}}
			>
				<FaEllipsisV className="text-teal-600" />
			</div>
			{open ? (
				<div
					className={`z-[100] shadow-md p-1 ${width} border flex ${margin} text-sm rounded-lg absolute bg-white`}
					style={styles.popper}
					{...attributes.popper}
					ref={setMenuRef}
				>
					<span className="w-full">
						{toggle ? (
							<label
								className="border-b text-black w-full flex justify-between items-center cursor-pointer gap-2 p-2 mb-1"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<span>Publish</span>
								<Switch
									className="bg-gray-300"
									onChange={onChange}
									defaultChecked={toggleChecked}
								/>
							</label>
						) : null}

						{DropDownObjects.map((item: any, index: any) => {
							return (
								<div
									key={index}
									className={`flex text-black gap-2 rounded-lg items-center text-left cursor-pointer py-2 px-2
                                    ${
										item.label === 'Delete'
											? 'text-red-500 hover:bg-red-100'
											: 'hover:bg-blue-100'
									}
                                    `}
									onClick={(e) => {
										e.stopPropagation();

										onOptionSelect(item);
										setOpen(false);
									}}
								>
									{item.svg}
									<span>{item.label}</span>
								</div>
							);
						})}
					</span>
				</div>
			) : null}
		</div>
	);
};

export default SettingsDropdown;
