
import React, {CSSProperties} from 'react';

import {ReactComponent as Layout1} from '../../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../../IMG/layout3.svg';
import {ReactComponent as Layout4} from '../../IMG/layout4.svg';

interface Props{
  onClick: (nr: number)=> void,
}

export function SetLayout({onClick}: Props):any{
  return( 
    <div style={container as CSSProperties}>
      <div style={{cursor: 'pointer'}}> <Layout1 onClick={ ()=>{ onClick(2);}} /> </div>
      <div style={{cursor: 'pointer'}}> <Layout2 onClick={ ()=>{ onClick(1);}} /> </div>
      <div style={{cursor: 'pointer'}}> <Layout3 onClick={ ()=>{ onClick(3);}} /> </div>
      <div style={{cursor: 'pointer'}}> <Layout4 onClick={ ()=>{ onClick(4);}} /> </div>
    </div>);
}

const container = {
  position:'absolute', 
  zIndex: 2,
  right: 2,
  borderBottom: '1px solid silver',
}

export default SetLayout;