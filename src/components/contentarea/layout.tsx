
import React, {useState, useEffect, CSSProperties} from 'react';

import {ReactComponent as Layout1} from '../../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../../IMG/layout3.svg';

// and then render: <MySvgComponent style={{fill: “#fff”}} />
interface Props{
  onClick: (nr: number)=> void,
}

export function SetLayout(props: Props):any{
  return( 
    <div style={container as CSSProperties}>
      <div> <Layout1 onClick={ ()=>{ props.onClick(2);}} /> </div>
      <div> <Layout2 onClick={ ()=>{ props.onClick(1);}} /> </div>
      <div> <Layout3 onClick={ ()=>{ props.onClick(3);}} /> </div>

    </div>);
}

const container = {
  position:'absolute', 
  zIndex: 2,
  right: 5,
}

export default SetLayout;