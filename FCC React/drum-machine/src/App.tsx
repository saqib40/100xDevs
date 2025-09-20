import React, { useState, useEffect, useCallback } from 'react';

interface DrumPadData {
  keyCode: number;
  keyTrigger: string;
  id: string;
  url: string;
}

const bankOne: DrumPadData[] = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

interface DrumPadProps {
  pad: DrumPadData;
  playSound: (key: string, id: string) => void;
  isActive: boolean;
}

const DrumPad: React.FC<DrumPadProps> = ({ pad, playSound, isActive }) => {
  const activeStyle = 'bg-orange-500 scale-95 shadow-inner';
  const inactiveStyle = 'bg-gray-600 hover:bg-gray-500 shadow-md';

  return (
    <div
      id={pad.id}
      className={`drum-pad w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-lg text-white text-2xl font-bold cursor-pointer transition-all duration-75 ${isActive ? activeStyle : inactiveStyle}`}
      onClick={() => playSound(pad.keyTrigger, pad.id)}
    >
      {pad.keyTrigger}
      <audio
        className="clip"
        id={pad.keyTrigger}
        src={pad.url}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [power, setPower] = useState<boolean>(true);
  const [display, setDisplay] = useState<string>('');
  const [volume, setVolume] = useState<number>(0.5);
  const [activePad, setActivePad] = useState<string | null>(null);

  const playSound = useCallback((key: string, id: string) => {
    if (!power) return;

    const audio = document.getElementById(key) as HTMLAudioElement;
    if (audio) {
      setActivePad(id);
      setTimeout(() => setActivePad(null), 100);

      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(error => console.error("Audio play failed:", error));

      setDisplay(id.replace(/-/g, ' '));
    }
  }, [power, volume]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const pad = bankOne.find(p => p.keyCode === e.keyCode);
    if (pad) {
      playSound(pad.keyTrigger, pad.id);
    }
  }, [playSound]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setDisplay(`Volume: ${Math.round(newVolume * 100)}`);
    setTimeout(() => setDisplay(''), 1000); // Clear volume display after 1 second
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center font-sans text-gray-200">
      <div id="drum-machine" className="bg-gray-900 border border-gray-700 p-6 md:p-8 rounded-xl shadow-2xl flex flex-col md:flex-row gap-8 w-full max-w-2xl mx-4">
        
        {/* Drum Pads Grid */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          {bankOne.map(pad => (
            <DrumPad 
              key={pad.id} 
              pad={pad} 
              playSound={playSound} 
              isActive={activePad === pad.id}
            />
          ))}
        </div>

        {/* Controls Panel */}
        <div className="flex flex-col justify-center items-center gap-5 w-full md:w-64">
          <div className="text-center">
             <h1 className="text-xl font-bold tracking-wider">DRUM KIT</h1>
             <p className="text-sm text-orange-400">FCC-01</p>
          </div>

          {/* Power Switch */}
          <div className="flex flex-col items-center">
            <p className="mb-1 text-sm font-semibold">Power</p>
            <div onClick={() => setPower(!power)} className="w-16 h-8 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer">
              <div className={`w-6 h-6 rounded-full bg-blue-500 transform transition-transform duration-200 ${power ? 'translate-x-8' : ''}`}></div>
            </div>
          </div>
          
          {/* Display */}
          <div 
            id="display" 
            className="w-full bg-gray-700 text-center font-mono p-4 rounded-md h-14 flex items-center justify-center text-lg transition-opacity duration-300"
          >
            {power ? display : ' '}
          </div>
          
          {/* Volume Slider */}
          <div className="w-full">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              disabled={!power}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
