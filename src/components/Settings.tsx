import React from 'react';

interface SettingsProps {
  flashTitle: boolean;
  setFlashTitle: (flashTitle: boolean) => void;
  audioAlert: boolean;
  setAudioAlert: (audioAlert: boolean) => void;
  desktopNotification: boolean;
  setDesktopNotification: (desktopNotification: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ flashTitle, setFlashTitle, audioAlert, setAudioAlert, desktopNotification, setDesktopNotification }) => {
  return (
    <div className="mt-4">
      <h5>Settings</h5>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flashTitle" checked={flashTitle} onChange={() => setFlashTitle(!flashTitle)} />
        <label className="form-check-label" htmlFor="flashTitle">Flash Title</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="audioAlert" checked={audioAlert} onChange={() => setAudioAlert(!audioAlert)} />
        <label className="form-check-label" htmlFor="audioAlert">Audio Alert</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="desktopNotification" checked={desktopNotification} onChange={() => setDesktopNotification(!desktopNotification)} />
        <label className="form-check-label" htmlFor="desktopNotification">Desktop Notifications</label>
      </div>
    </div>
  );
};

export default Settings;
