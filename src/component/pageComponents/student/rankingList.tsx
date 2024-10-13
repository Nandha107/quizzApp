import { FaMedal } from 'react-icons/fa';
type RankingEntry = {
    rank: number;
    studentName: string;
    registrationNumber: number;
    totalScore: number;
    isCurrentUser: boolean;
};

const RankingList = ({ rankingList }: { rankingList: RankingEntry[] }) => {
  const getRowStyle = (student: RankingEntry) => {
    return student.isCurrentUser ? 'bg-yellow-100' : 'bg-white';
  };

  // Function to display the correct medal or just the rank number
  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <FaMedal className="text-yellow-500" size={24} />; // Gold medal
    } else if (rank === 2) {
      return <FaMedal className="text-gray-400" size={24} />; // Silver medal
    } else if (rank === 3) {
      return <FaMedal className="text-amber-800" size={24} />; // Bronze medal
    } else {
      return <span className="text-lg font-bold">{rank}</span>; // Just the rank number
    }
  };

  return (
    <div className="lg:p-5 lg:bg-white rounded-lg lg:shadow-md mt-6">
      <p className="text-lg font-semibold mb-3">Ranking List</p>
      <div className="w-full space-y-4">
        {rankingList.map((student, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-md ${getRowStyle(student)}`}
          >
            {/* Rank Icon and Info */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mr-4">
              {getRankIcon(student.rank)}
            </div>
            {/* Student Info */}
            <div className="flex flex-col w-full">
              <p className="text-lg font-semibold">
                {student.studentName} {student.isCurrentUser && '(You)'}
              </p>
              <p className="text-sm text-gray-500">Registration No: {student.registrationNumber}</p>
              <p className="text-sm text-gray-700">Score: {student.totalScore}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingList;
