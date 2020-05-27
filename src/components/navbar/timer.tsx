import React from 'react';
import {useState, useEffect, useRef, CSSProperties} from 'react'

export const Timer = ()=> {
  const [minutes, setTimer] = useState(0);
  const [timerState, setTimerState] = useState('running');
  const intervalRef = useRef<any>();

  useEffect( ()=>{
    intervalRef.current = setInterval( ()=>{ setTimer(minutes => minutes + 1 ); }, 60000); 
    return ()=> { clearInterval(intervalRef.current); }
  },[] );

  const handleRun= (newRunState:string)=>{

    if( newRunState === 'run'){
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval( ()=>{ setTimer(minutes => minutes + 1 ); }, 60000); 
      setTimerState('running');

    } else if( newRunState === 'stop'){
      clearInterval(intervalRef.current);
      setTimer(0);
      setTimerState('stopped');

    } else if( newRunState === 'pause'){
      clearInterval(intervalRef.current);
      setTimerState('paused');
    }
  }

  const displayButtons = ()=>{

    if( timerState === 'running'){
      return( <span style={{display: 'inline-block', width: 20, backgroundColor: '', margin: 0, padding: 0, verticalAlign: 'top'}}>
        <span className='text-center m-0 p-0' style={buttonStyle} onClick={ ()=> handleRun('pause') }>||</span>
        <span className='text-center mt-1 ml-0 p-0' style={buttonStyle} onClick={ ()=> handleRun('stop') }>#</span>
      </span>)
    }

    if( timerState === 'paused' || timerState === 'stopped'){
      return( <span style={{display: 'inline-block', width: 20, backgroundColor: '', margin: 0, padding: 0, verticalAlign: 'top'}}>
        <div className="text-center m-0 p-0" style={buttonStyle as CSSProperties} onClick={ ()=> handleRun('run')}>&gt;</div>
        <div className='text-center mt-1 ml-0 p-0' style={buttonStyle as CSSProperties} tabIndex={1} onClick={ ()=> handleRun('stop') }>#</div>
      </span>)
    }
  }

  return( 
  <div style={container}>
    <div>
      {displayButtons()}
      <span className="ml-2 mr-1">{minutes}</span>
      <span style={{fontSize: 8}}>min</span>
    </div>
  </div>)
}

const container: CSSProperties = {
  display: 'block',
  position: 'absolute', 
  right: -10,
  top: 3,
  zIndex: 1,
  width: 80,
  overflow: 'visible',
}

const buttonStyle={
  width: '100%',
  display: 'block',
  margin: 5,
  fontSize: 6,
  color: 'white', border: '1px solid silver',
  cursor: 'pointer',
  padding: 2,
  borderRadius: 3,
  borderBox: 'box-sizing',
}

export default Timer;