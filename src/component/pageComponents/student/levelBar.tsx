import React from 'react';

interface LevelBarProps {
	totalLevels: number; // Total number of levels
	activeLevel: number; // Current active level (0-based index)
	completedLevels: number[]; // Array of completed levels (0-based indices)
}

const LevelBar: React.FC<LevelBarProps> = ({ totalLevels, activeLevel, completedLevels }) => {
	return (
		<div className=" w-[60%] h-4 p-1 flex justify-between text-center gap-1 items-center bg-[#F3F7FC] rounded-md ">

			{Array.from({ length: totalLevels }, (_, index) => {
				const isCompleted = completedLevels.includes(index);
				const isActive = index === activeLevel;
				const isLocked = index > activeLevel;

				return (
					<div
						key={index}
						className={`h-2 p-[3px] rounded-2xl   ${
							isCompleted
								? 'bg-emerald-600'
								: isActive
									? 'bg-emerald-600'
									: isLocked
										? 'bg-gray-400'
										: 'bg-gray-300'
						} 
                        transition-all duration-300 relative `}
						style={{
							width: `${100 / totalLevels}%`,
							display: 'inline-block',
						}}
					>
					
					</div>
				);
			})}
		
		</div>
	);
};

export default LevelBar;
