import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';

function App() {
  const [mode, setMode] = useState('focus'); // 'focus', 'shortBreak', 'longBreak'
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const [flashTitle, setFlashTitle] = useState(true);
  const [audioAlert, setAudioAlert] = useState(true);
  const [desktopNotification, setDesktopNotification] = useState(true);

  const handleTestClick = () => {
    setTime(3);
    setIsActive(true);
  };

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
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-1.mp3'); // Placeholder sound
        audio.play();
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
  }, [isActive, time, audioAlert, desktopNotification, flashTitle, handleModeChange, mode, pomoCount]);

  useEffect(() => {
    if (desktopNotification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [desktopNotification]);

  useEffect(() => {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    };
    document.title = `${formatTime(time)} - Pomo`;
  }, [time]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow" style={{ width: '30rem' }}>
        <div className="card-body text-center">
          <h1 className="text-center">Pomo</h1>
          <Timer time={time} />
          <Controls
            isActive={isActive}
            setIsActive={setIsActive}
            handleModeChange={handleModeChange}
            mode={mode}
            handleTestClick={handleTestClick}
          />
          <Settings
            flashTitle={flashTitle}
            setFlashTitle={setFlashTitle}
            audioAlert={audioAlert}
            setAudioAlert={setAudioAlert}
            desktopNotification={desktopNotification}
            setDesktopNotification={setDesktopNotification}
          />
        </div>
      </div>
    </div>
  )
}

export default App