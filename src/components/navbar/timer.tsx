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
      intervalRef.current = setInterval( ()=>{ setTimer(minutes => minutes + 1 ); }, 1000); 
      setTimerState('running');

    } else if( newRunState === 'stop'){
      clearInterval(intervalRef.current);
      setTimer(minutes=>0);
      setTimerState('stopped');

    } else if( newRunState === 'pause'){
      clearInterval(intervalRef.current);
      setTimerState('paused');
    }
  }

  const displayButtons = ()=>{

    if( timerState === 'stopped'){
      return ( 
        <span>
          <div className='text-center' style={{...buttonStyle, ...{marginLeft: 0, width: 65, textAlign: 'center'}}} onClick={ ()=> handleRun('run')}>&gt;</div>
        </span>);
    }

    if( timerState === 'running'){
      return( <span>
        <div className='text-center ml-0' style={buttonStyle} onClick={ ()=> handleRun('pause') }>||</div>
        <div className='text-center ml-2' style={buttonStyle} onClick={ ()=> handleRun('stop') }>#</div>
      </span>)
    }

    if( timerState === 'paused'){
      return(<span>
        <div className="text-center ml-0" style={buttonStyle} onClick={ ()=> handleRun('run')}>&gt;</div>
        <div className='text-center ml-2' style={buttonStyle} tabIndex={1} onClick={ ()=> handleRun('stop') }>#</div>
      </span>)
    }
  }

  return( 
  <div style={container}>
    <div>
      {displayButtons()}
      <span className="ml-3">Minutes: {minutes}</span>
    </div>
  </div>)
}

const container: CSSProperties = {
  display: 'block',
  position: 'absolute', 
  right: 50,
  top: 0,
  padding: 10,
  zIndex: 999,
  width: 200,
}

const buttonStyle={
  width:30,
  fontSize: 10,
  // backgroundColor: 'orange',
  padding: '1px 0px',
  color: 'black',
  display: 'inline-block',
  cursor: 'pointer',
  border: '1px solid black',
  borderRadius: 3,
}

export default Timer;