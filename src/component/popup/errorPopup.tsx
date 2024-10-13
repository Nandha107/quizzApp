import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi'; // Close icon
import { AiOutlineExclamationCircle } from 'react-icons/ai'; // Error icon
import { useNavigate } from 'react-router-dom';

const ErrorPopup = ({
	message,
	heading,
	navigateTo,
}: {
	message: string;
	navigateTo?: string;
	heading: string;
}) => {
	const [showPopup, setShowPopup] = useState(true);

	const navigate = useNavigate();
	const handleClose = () => {
		setShowPopup(false);
		navigate(navigateTo as string);
	};
	return (
		<>
			{showPopup && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
					<div className="bg-white flex flex-col gap-2 p-8 rounded-lg shadow-2xl max-w-lg w-full relative border-l-4 border-red-500">
						{/* Close Button */}
						<button
							onClick={handleClose}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
						>
							<FiXCircle className="w-6 h-6" />
						</button>

						{/* Icon and Title */}
						<div className="flex items-center space-x-4">
							<AiOutlineExclamationCircle className="w-10 h-10 text-red-600" />
							<h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
						</div>

						{/* Message */}
						<p className="text-gray-600 mt-4 text-lg">{message}</p>

						{/* Action Button */}
						<div className="mt-6 flex justify-end">
							<button
								onClick={() => {
									handleClose();
								}}
								className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ErrorPopup;
