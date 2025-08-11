import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="text-center my-4">
      <h2 className="timer">{formatTime(time)}</h2>
    </div>
  );
};

export default Timer;
