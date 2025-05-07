import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700">Progress</span>
        <span className="text-sm font-medium text-blue-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Question {current} of {total}</span>
      </div>
    </div>
  );
};

export default ProgressBar;