import React from 'react';

type ProgressBarProps = {
  progress: number; // Value between 0 and 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }: ProgressBarProps) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
