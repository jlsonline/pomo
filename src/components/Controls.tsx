import React from 'react';

interface ControlsProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  handleModeChange: (mode: string) => void;
  mode: string;
  handleTestClick: () => void;
  handleReset: () => void;
  stopSound: () => void;
  repeatSound: boolean;
  isSoundPlayingAndRepeating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ isActive, setIsActive, handleModeChange, mode, handleTestClick, handleReset, stopSound, repeatSound, isSoundPlayingAndRepeating }) => {
  return (
    <div className="text-center">
      <div className="btn-group mb-3">
        <button className={`btn btn-outline-primary ${mode === 'focus' && 'active'}`} onClick={() => handleModeChange('focus')}>Focus</button>
        <button className={`btn btn-outline-primary ${mode === 'shortBreak' && 'active'}`} onClick={() => handleModeChange('shortBreak')}>Short Break</button>
        <button className={`btn btn-outline-primary ${mode === 'longBreak' && 'active'}`} onClick={() => handleModeChange('longBreak')}>Long Break</button>
      </div>
      <div>
        <button className="btn btn-primary btn-lg mx-2" onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-secondary btn-lg mx-2" onClick={handleTestClick}>
          Test (3s)
        </button>
        <button className="btn btn-danger btn-lg mx-2" onClick={handleReset}>
          Reset
        </button>
        <a href="#" className="btn btn-link" style={{ visibility: isSoundPlayingAndRepeating ? 'visible' : 'hidden' }} onClick={(e) => { e.preventDefault(); stopSound(); }}>
          Stop Sound
        </a>
      </div>
    </div>
  );
};

export default Controls;
