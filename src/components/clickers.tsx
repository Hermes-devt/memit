

import React from 'react';
import {useState, useEffect} from 'react';
export function Clickers(){
  const [count, setCount] = useState(0);

  const increase = ()=>{
    setCount(count + 1);
  }
  const decrease = ()=>{
    setTimeout( ()=>{ setCount(count - 1); }, 250);
  }
  return(
    <div>
      <button onClick={increase} data-testid="up">Up</button>
      <button onClick={decrease} data-testid="down">Down</button>
      <span data-testid="count">{count}</span>
    </div>
  )

}
export default Clickers;