import React from 'react';
import { AiOutlineClose, AiOutlineBell } from 'react-icons/ai';

interface QuizReminderPopupProps {
  showPopup: boolean;
  onClose: () => void;
}

const QuizReminderPopup: React.FC<QuizReminderPopupProps> = ({ showPopup, onClose }) => {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 scale-100 hover:scale-105">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Title with Icon */}
        <div className="flex items-center mb-4">
          <AiOutlineBell size={28} className="text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold">Reminder</h2>
        </div>

        {/* Message */}
        <p className="mb-4 text-gray-700">
          You have switched tabs multiple times. If you switch tabs again, the test will close, and you will fail.
        </p>
        {/* Action Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md transform transition-all duration-200 hover:scale-105"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizReminderPopup;
