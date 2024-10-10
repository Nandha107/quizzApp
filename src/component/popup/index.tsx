import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { SecondaryOutlineButton } from '../buttons/secondaryOutlineButton';

interface Modal {
	children?: React.ReactNode;
	curserPointer?: boolean;
	className?: string;
	background?: string;
	ref?: any;
	onClose?: () => void;
	onCancel?: () => void;
	closeButton?: boolean;
	loading?: boolean;
}

export const Popup: React.FC<Modal> = ({
	ref,
	children,
	onClose,
	onCancel,
	closeButton = false,
	className = 'p-4',
	loading = false,
	// curserPointer,
	background,
}) => {
	const [root, setRoot] = useState<HTMLDivElement>();

	function closeOnEscKeyPress(e: KeyboardEvent) {
		if (e.key !== 'Escape') return;

		onClose?.();
	}

	useEffect(() => {
		const div = document.createElement('div');

		document.body.appendChild(div);

		setRoot(div);

		document.addEventListener('keydown', closeOnEscKeyPress);

		return () => {
			document.removeEventListener('keydown', closeOnEscKeyPress);

			if (!div) return;
			div.remove();
		};
	}, []);

	// const onOutsideClick = () => {
	// 	onClose?.();
	// };

	return root
		? createPortal(
				<div
					ref={loading === false ? ref : null}
					className={`w-full h-full transition-all absolute top-0 left-0
                        ${
							background ? background : 'bg-black/20'
						} backdrop-blur-sm z-[1000] flex items-center justify-center overflow-y-auto`}
					style={{
						background: 'rgba(0, 0, 0, 0.62)',
						zIndex: 1002,
					}}
					onClick={() => {
						loading === false ? onClose?.() : null;
					}}
				>
					<motion.div
						className="relative rounded-xl bg-white w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%]"
						onClick={(e) => e.stopPropagation()}
						variants={{
							initial: { y: 50, opacity: 0.8 },
							visible: { y: 0, opacity: 1 },
						}}
						initial={'initial'}
						animate={'visible'}
						exit={'exit'}
					>
						{closeButton === true ? (
							<SecondaryOutlineButton
								className={`
							absolute z-50 top-3 right-3
							${loading === true ? 'hidden ' : 'visible'}
						`}
								onClick={() => {
									onClose?.();
									onCancel && onCancel();
								}}
								icon={<MdClose />}
							/>
						) : null}

						<div className={`${className}`}>{children}</div>
					</motion.div>
				</div>,
				// <div
				// 	className={`fixed top-0 left-0 flex items-center justify-center ${
				// 		background ? background : 'bg-black/20'
				// 	} backdrop-blur-sm w-full h-full z-[1000] ${className}`}
				// >
				// 	<div
				// 		className={`absolute top-0 left-0 z-10 w-full h-full bg-transparent ${
				// 			curserPointer ? 'cursor-pointer' : ''
				// 		}`}
				// 		onClick={onOutsideClick}
				// 	></div>
				// 	<div className="z-20">{children}</div>
				// </div>,
				root,
			)
		: null;
};
