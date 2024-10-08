import React, { useEffect, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { PrimaryButton } from '../buttons/primaryButton';

type handleGenerateProps = {
  topic: string;
  generateImage?: boolean;
  numberOfQuestions: number;
  answerTypeOptions: boolean;
  answerTypeTextArea: boolean;
  timeDurationType: string;
};

interface PopupProps {
  isOpen: boolean;
  loding:boolean,
  onClose: () => void;
  handleGenerate: (value: handleGenerateProps) => void;
}

const AiGenerateQuestionPopup: React.FC<PopupProps> = ({ isOpen, onClose, handleGenerate,loding }) => {
  const [topic, setTopic] = useState<string>('');
  const [generateImage, setGenerateImage] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [answerTypeOptions, setAnswerTypeOptions] = useState<boolean>(false);
  const [answerTypeTextArea, setAnswerTypeTextArea] = useState<boolean>(true);
  const [timeDurationType, setTimeDurationType] = useState<string>('single');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Suggested topics
  const suggestedTopics = [
    'Structural Analysis',
    'Fluid Mechanics',
    'Geotechnical Engineering',
    'Transportation Engineering',
    'Environmental Engineering',
    'Construction Management',
    'Material Science',
    'Soil Mechanics',
    'Hydraulics',
    'Surveying',
    'Reinforced Concrete Design',
    'Steel Structures',
    'Urban Planning',
    'Project Management',
    'Sustainable Construction Practices',
  ];
  
  // State for error messages
  const [errors, setErrors] = useState<{
    topic?: string;
    numberOfQuestions?: string;
    answerType?: string;
  }>({});

  // Validate form fields
  const validate = () => {
    const newErrors: {
      topic?: string;
      numberOfQuestions?: string;
      answerType?: string;
    } = {};

    if (!topic) {
      newErrors.topic = 'Topic is required';
    }

    if (numberOfQuestions <= 0) {
      newErrors.numberOfQuestions = 'Number of questions must be greater than 0';
    }

    if (!answerTypeOptions && !answerTypeTextArea) {
      newErrors.answerType = 'At least one answer type must be selected';
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const formData = {
      topic,
      generateImage,
      numberOfQuestions,
      answerTypeOptions,
      answerTypeTextArea,
      timeDurationType,
    };
    handleGenerate({ ...formData });

  };

  const handleTopicSelection = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setShowSuggestions(false);
  };
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (!loding&&suggestionRef.current && !suggestionRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [suggestionRef]);
  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-black bg-opacity-50 z-50 rounded-lg">
    <div className="bg-white rounded-lg shadow-lg md:w-[50%] w-[90%] lg:w-[50%] xl:w-[38%] relative">
      {/* Header */}
      <div className="flex justify-between py-3 rounded-t-lg px-5 border shadow-md">
  <div className="flex items-center w-full justify-between">
    <h1 className="text-xl font-semibold">AI Test Creator</h1>
    <p className='hover:bg-slate-200 p-2 border border-slate-800 rounded-full cursor-pointer' onClick={onClose}>
      <CgClose className='h-5 w-5' />
    </p>
  </div>
  <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
    <i className="fas fa-times"></i>
  </button>
</div>


      <div className='p-10 flex flex-col gap-4'>
         {/* Topic Input */}
      <div className="relative" ref={suggestionRef}>
        <label className="block text-gray-700">Topic</label>
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className={`w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 ${
            errors.topic ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
          }`}
        />
        {errors.topic && <p className="text-red-500 text-sm">{errors.topic}</p>}
  
        {/* Suggestions */}
        {showSuggestions && (
          <div className="absolute z-40 top-full mt-2 w-full bg-white border rounded-md shadow-lg overflow-hidden" style={{ maxHeight: '150px', overflowY: 'auto' }}>
            <div className="flex flex-wrap p-2">
              {suggestedTopics.map((suggestion, index) => (
                <button
                  key={index}
                  className="flex-1 m-1 p-2 bg-teal-50 text-teal-600 font-semibold rounded hover:bg-teal-100"
                  onClick={() => handleTopicSelection(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
  
      {/* Image Generation Toggle */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-gray-700">Generate Image <span className="text-sm text-gray-500">(Coming Soon)</span></label>
        <label className="relative inline-flex items-center cursor-not-allowed">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={generateImage}
            onChange={() => setGenerateImage(!generateImage)}
            disabled
          />
          <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>
  
      {/* Number of Questions */}
      <div className="mb-4">
  <label className="block text-gray-700">Number of Questions</label>
  <input
    type="number"
    value={numberOfQuestions}
    onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
    className={`w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 ${
      errors.numberOfQuestions ? 'border-red-500 focus:ring-red-500' : 'focus:ring-green-500'
    }`}
  />
  {errors.numberOfQuestions && (
    <p className="text-red-500 text-sm">{errors.numberOfQuestions}</p>
  )}
</div>

{/* Answer Type Selection */}
<div className="flex flex-col gap-2">
  <label className="block text-gray-700">Choose answer type <span className="text-red-500">*</span></label>
  <div className="flex items-center mt-2 space-x-4">
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        className=" w-6 h-6 border border-gray-300 rounded-sm"
        checked={answerTypeOptions}
        onChange={() => setAnswerTypeOptions(!answerTypeOptions)}
      />
      <label className="text-gray-700">Options</label>
    </div>
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        className=" w-6 h-6 border border-gray-300 rounded-sm  "
        checked={answerTypeTextArea}
        onChange={() => setAnswerTypeTextArea(!answerTypeTextArea)}
      />
      <label className="text-gray-700">Text area</label>
    </div>
  </div>
  {errors.answerType && (
    <p className="text-red-500 text-sm">{errors.answerType}</p>
  )}
</div>

{/* Time Duration Selection */}
<div className="flex flex-col gap-4">
  <label className="block text-gray-700">Choose time duration type for test <span className="text-red-500">*</span></label>
  <div className="flex items-center  gap-2">
    <div className="flex items-center gap-1">
      <input
        type="radio"
        name="time"
        className="appearance-none w-6 h-6 border border-gray-300 rounded-full checked:bg-teal-600 checked:border-transparent focus:outline-none"
        value="overall"
        checked={timeDurationType === 'overall'}
        onChange={() => setTimeDurationType('overall')}
      />
      <label className="text-gray-700">Set overall time</label>
    </div>
    <div className="flex items-center gap-1">
      <input
        type="radio"
        name="time"
        className="w-6 h-6 border border-gray-300 rounded-full checked:bg-teal-600 checked:border-transparent focus:outline-none"
        value="single"
        checked={timeDurationType === 'single'}
        onChange={() => setTimeDurationType('single')}
      />
      <label className="text-gray-700">Set time for single question</label>
    </div>
  </div>
</div>

  
      {/* Generate Button */}
      <div className="flex justify-end">
        {/* <button
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleSubmit}
        >
          Generate
        </button> */}

        <PrimaryButton text={loding?"loading...":'Generate'} onClick={handleSubmit}
        />
      </div>
      </div>
      
     
    </div>
  </div>
  
  );
};

export default AiGenerateQuestionPopup;
