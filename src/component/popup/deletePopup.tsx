import React from 'react';
import { Popup } from '.';
import { SecondaryOutlineButton } from '../buttons/secondaryOutlineButton';
import { DeleteButton } from '../buttons/deleteButton';

interface DeletePopupProps {
	onClose: () => void;
	onClick?: () => void;
	cancelButton?: string;
	confirmButton?: string;
	loadingText?: string;
	loader?: boolean;
}
const DeletePopup: React.FC<DeletePopupProps> = ({
	onClose,
	onClick,
	cancelButton,
	confirmButton,
	loadingText,
	loader,
}) => {
	return (
		<Popup className="flex justify-center items-center w-full p-5" onClose={onClose}>
			<div className={`flex flex-col gap-10`}>
				<div className="flex-col flex  gap-2">
					<div className="font-bold text-xl ">Are you sure ?</div>
					<div className="text-sm  break-words">
						You're about to delete. It'll be gone forever and we won't be able to
						recover it.
					</div>
				</div>
				<div className="flex flex-row gap-5 justify-end">
					{loader === false ? (
						<SecondaryOutlineButton
							text={cancelButton}
							className={cancelButton}
							onClick={onClose}
						/>
					) : null}
					<DeleteButton
						loader={loader}
						loadingText={loadingText}
						text={confirmButton}
						onClick={onClick}
					/>
				</div>
			</div>
		</Popup>
	);
};

export default DeletePopup;
