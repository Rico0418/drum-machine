import React,{useState,useEffect} from 'react';
import DrumPad from './DrumPad';
import './App.css';

const Drum =[
  {keyCode: 81, keyTrigger: 'Q', id: 'Heater-1', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'},
  {keyCode: 87, keyTrigger: 'W', id: 'Heater-2', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'},
  {keyCode: 69, keyTrigger: 'E', id: 'Heater-3', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'},
  {keyCode: 65, keyTrigger: 'A', id: 'Heater-4', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'},
  {keyCode: 83, keyTrigger: 'S', id: 'Clap', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'},
  {keyCode: 68, keyTrigger: 'D', id: 'Open-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'},
  {keyCode: 90, keyTrigger: 'Z', id: "Kick-n'-Hat", url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'},
  {keyCode: 88, keyTrigger: 'X', id: 'Kick', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'},
  {keyCode: 67, keyTrigger: 'C', id: 'Closed-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'},
];

const App = () =>{
  const [display,setDisplay] = useState('');
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  useEffect(()=>{
    const handleKeyDown=(event)=>{
      const pad = Drum.find(pad=>pad.keyCode === event.keyCode);
      if(pad){
        playSound(pad.keyTrigger,pad.id);
      }
    };
    window.addEventListener('keydown',handleKeyDown);
    return ()=> window.removeEventListener('keydown',handleKeyDown);
  },[power, volume]);

  const playSound = (keyTrigger,id) =>{
    if(!power) return;
    const audio = document.getElementById(keyTrigger);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(id);
    const drumPad = document.getElementById(id);
    if(drumPad){
      drumPad.classList.add('active');
      setTimeout(() => {
        drumPad.classList.remove('active');
      }, 100);
    }
  };
  const togglePower = () =>{
    setPower(!power);
  };
  const handleVolumeChange = (event) =>{
    setVolume(event.target.value);
  };
  return(
    <div id="drum-machine" style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'20px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px'}}>
        <button onClick={togglePower} style={{backgroundColor: 'blue', color: 'white', padding: '10px',border: 'none', borderRadius: '4px'}}>{power? 'Power Off': 'Power On'}</button>
        <label htmlFor='volume' style={{color: 'white', fontWeight: '600'}}>Volume: </label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="pads">
        {Drum.map((pad)=>(
          <DrumPad
            key={pad.id}
            id={pad.id}
            url={pad.url}
            keyTrigger={pad.keyTrigger}
            sound={playSound}
          />
        ))}
      </div>
    </div>
  )
}
export default App;
