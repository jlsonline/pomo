import { useState, useEffect, useCallback, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './theme.css';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';

interface SoundOption {
  name: string;
  url: string;
}

const soundOptions: SoundOption[] = [
  { name: 'Bell', url: '/sounds/bell.mp3' },
  { name: 'Chime', url: '/sounds/chime.mp3' },
  { name: 'Ding', url: '/sounds/ding.mp3' },
];

function App() {
  const [mode, setMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const [flashTitle, setFlashTitle] = useState(true);
  const [audioAlert, setAudioAlert] = useState(true);
  const [desktopNotification, setDesktopNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [repeatSound, setRepeatSound] = useState(false);
  const [selectedSound, setSelectedSound] = useState(soundOptions[2].url);
  const [isSoundPlayingAndRepeating, setIsSoundPlayingAndRepeating] = useState(false);
  const audioInstance = useRef<HTMLAudioElement | null>(null);

  const stopSound = () => {
    if (audioInstance.current) {
      audioInstance.current.pause();
      audioInstance.current.currentTime = 0;
      audioInstance.current = null; // Crucial: Nullify the instance after stopping
      setIsSoundPlayingAndRepeating(false); // Set to false when sound stops
    }
  };

  const handleTestClick = () => {
    stopSound();
    setTime(3);
    setIsActive(true);
  };

  const handleReset = () => {
    stopSound();
    setMode('focus');
    setTime(25 * 60);
    setIsActive(false);
    setPomoCount(0);
  };

  const handleToggleDesktopNotification = useCallback(async (checked: boolean) => {
    if (checked) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setDesktopNotification(true);
        setNotificationMessage(null); // Clear message on success
      } else {
        setDesktopNotification(false); // Keep it false if permission denied
        setNotificationMessage('Desktop notification permission denied. Please enable it in your browser settings.');
      }
    } else {
      setDesktopNotification(false);
    }
  }, []);

  const handleModeChange = useCallback((newMode: string) => {
    setMode(newMode);
    setIsActive(false);
    switch (newMode) {
      case 'focus':
        setTime(25 * 60);
        break;
      case 'shortBreak':
        setTime(5 * 60);
        break;
      case 'longBreak':
        setTime(15 * 60);
        break;
      default:
        setTime(25 * 60);
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);

      if (flashTitle) {
        let isFlashing = false;
        const originalTitle = document.title;
        const flashInterval = setInterval(() => {
          document.title = isFlashing ? originalTitle : "Time's up!";
          isFlashing = !isFlashing;
        }, 500);
        setTimeout(() => {
          clearInterval(flashInterval);
          document.title = originalTitle;
        }, 5000);
      }

      if (audioAlert) {
        const newAudio = new Audio(selectedSound);
        newAudio.loop = repeatSound;
        try {
          newAudio.play();
          audioInstance.current = newAudio;
          if (repeatSound) {
            setIsSoundPlayingAndRepeating(true);
          }
        } catch (error) {
          console.error("Error playing audio:", error);
          // Optionally, provide user feedback about the error
        }
      }

      if (desktopNotification && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: `${mode === 'focus' ? 'Focus' : 'Break'} period is over!`,
        });
      }

      if (mode === 'focus') {
        const newPomoCount = pomoCount + 1;
        setPomoCount(newPomoCount);
        if (newPomoCount % 4 === 0) {
          handleModeChange('longBreak');
        } else {
          handleModeChange('shortBreak');
        }
      } else { // shortBreak or longBreak
        handleModeChange('focus');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, audioAlert, flashTitle, desktopNotification, handleModeChange, mode, pomoCount, repeatSound, selectedSound, isSoundPlayingAndRepeating]);

  

  useEffect(() => {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    };
    document.title = `${formatTime(time)} - Pomo`;
  }, [time]);

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage(null);
      }, 5000); // Clear message after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="text-center">Pomo</h1>
          <div className="text-center mb-3">
            {mode === 'focus' && `Focus Session ${pomoCount + 1}/4`}
            {mode === 'shortBreak' && 'Short Break'}
            {mode === 'longBreak' && 'Long Break'}
          </div>
          <Timer time={time} className="text-center" />
          <Controls
            isActive={isActive}
            setIsActive={setIsActive}
            handleModeChange={handleModeChange}
            mode={mode}
            handleTestClick={handleTestClick}
            handleReset={handleReset}
          />
          <Settings
            flashTitle={flashTitle}
            setFlashTitle={setFlashTitle}
            audioAlert={audioAlert}
            setAudioAlert={setAudioAlert}
            desktopNotification={desktopNotification}
            onToggleDesktopNotification={handleToggleDesktopNotification}
            repeatSound={repeatSound}
            setRepeatSound={setRepeatSound}
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
            soundOptions={soundOptions}
            stopSound={stopSound}
            isSoundPlayingAndRepeating={isSoundPlayingAndRepeating}
          />
          <div className={`alert alert-warning mt-3 ${!notificationMessage ? 'd-none' : ''}`} role="alert">
            {notificationMessage}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App