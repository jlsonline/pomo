import React from 'react';

interface SoundOption {
  name: string;
  url: string;
}

interface SettingsProps {
  flashTitle: boolean;
  setFlashTitle: (flashTitle: boolean) => void;
  audioAlert: boolean;
  setAudioAlert: (audioAlert: boolean) => void;
  desktopNotification: boolean;
  setDesktopNotification: (desktopNotification: boolean) => void;
  repeatSound: boolean;
  setRepeatSound: (repeatSound: boolean) => void;
  selectedSound: string;
  setSelectedSound: (soundUrl: string) => void;
  soundOptions: SoundOption[];
}

const Settings: React.FC<SettingsProps> = ({ 
  flashTitle, setFlashTitle, 
  audioAlert, setAudioAlert, 
  desktopNotification, setDesktopNotification, 
  repeatSound, setRepeatSound, 
  selectedSound, setSelectedSound, 
  soundOptions 
}) => {
  return (
    <div className="mt-4">
      <h5>Settings</h5>
      <div className="form-check form-switch mb-2">
        <input className="form-check-input" type="checkbox" role="switch" id="flashTitle" checked={flashTitle} onChange={() => setFlashTitle(!flashTitle)} />
        <label className="form-check-label" htmlFor="flashTitle">Flash Title</label>
      </div>
      <div className="form-check form-switch mb-2">
        <input className="form-check-input" type="checkbox" role="switch" id="audioAlert" checked={audioAlert} onChange={() => setAudioAlert(!audioAlert)} />
        <label className="form-check-label" htmlFor="audioAlert">Audio Alert</label>
      </div>
      <div className="form-check form-switch mb-2">
        <input className="form-check-input" type="checkbox" role="switch" id="repeatSound" checked={repeatSound} onChange={() => setRepeatSound(!repeatSound)} />
        <label className="form-check-label" htmlFor="repeatSound">Repeat Sound until Acknowledged</label>
      </div>
      <div className="form-check form-switch mb-2">
        <input className="form-check-input" type="checkbox" role="switch" id="desktopNotification" checked={desktopNotification} onChange={() => setDesktopNotification(!desktopNotification)} />
        <label className="form-check-label" htmlFor="desktopNotification">Desktop Notifications</label>
      </div>

      <div className="mb-3">
        <label htmlFor="soundSelect" className="form-label">Choose Sound:</label>
        <select 
          className="form-select" 
          id="soundSelect" 
          value={selectedSound} 
          onChange={(e) => setSelectedSound(e.target.value)}
        >
          {soundOptions.map((option) => (
            <option key={option.url} value={option.url}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;
