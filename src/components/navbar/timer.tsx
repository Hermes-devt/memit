import React from 'react';
import {useState, useEffect, useRef} from 'react'
import '../../CSS/timer.scss';

export const Timer = ()=> {
  const [minutes, setTimer] = useState(0);
  const [timerState, setTimerState] = useState('running');
  const intervalRef = useRef<any>();

  useEffect( ()=>{
    intervalRef.current = setInterval( ()=>{ setTimer(minutes => minutes + 1 ); }, 60000); 
    return ()=> { clearInterval(intervalRef.current); }
  },[] );

  const handleRun= (newRunState:string)=>{

    switch( newRunState){
      case "run":
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval( ()=>{ setTimer(minutes => minutes + 1 ); }, 60000); 
        setTimerState('running');
        break;
      case 'stop':
        clearInterval(intervalRef.current);
        setTimer(0);
        setTimerState('stopped');
        break;
      case 'pause':
        clearInterval(intervalRef.current);
        setTimerState('paused');
        break;
    }
  }

  const displayButtons = ()=>{

    if( timerState === 'running'){
      return( <span className="pauseStopButton noselect">
        <span className='m-0 p-0 buttonStyle' onClick={ ()=> handleRun('pause') }>||</span>
        <span className='buttonStyle buttonMargin' onClick={ ()=> handleRun('stop') }>#</span>
      </span>)
    }

    if( timerState === 'paused' || timerState === 'stopped'){
      return( <span className="pauseStopButton noselect" >
        <div className="m-0 p-0 buttonStyle" onClick={ ()=> handleRun('run')}>&gt;</div>
        <div className='buttonStyle buttonMargin' tabIndex={1} onClick={ ()=> handleRun('stop') }>#</div>
      </span>)
    }
  }

  return( 
  <div id="timerContainer" className="noselect">
    <div>
      {displayButtons()}
      <span className="ml-2 mr-1">{minutes}</span>
      <span style={{fontSize: 8}}>min</span>
    </div>
  </div>)
}

export default Timer;