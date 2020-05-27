
import React, {CSSProperties} from 'react';
import {ReactComponent as Layout1} from '../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../IMG/layout3.svg';
import {ReactComponent as Layout4} from '../IMG/layout4.svg';
import {ReactComponent as Menu} from '../IMG/menuWhite.svg';
import Timer from '../components/navbar/timer';


export function SettingsBar(props:any):any{
  return(
  <div style={styles.container as CSSProperties}>
    <Timer />

    <span 
      style={styles.menu as CSSProperties}
      onClick={ ()=>{ props.menuClick() }}
      > <Menu />
      {props.displayVerticalBar && <span style={{marginLeft: 10}}>Hide menu</span>}
      {!props.displayVerticalBar && <span style={{marginLeft: 10}}>Display menu</span> }
    </span>
    <div style={styles.layoutContainer as CSSProperties}>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(2)}> <Layout1 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(1)}> <Layout2 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(3)}> <Layout3 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(4)}> <Layout4 /> </span>
    </div>
  </div>)
}


const styles = {
  menu: {
    position: 'relative',
    top: 3,
    left: 10,
    cursor: 'pointer',
  },

  container: {
    position: 'relative',
    height: '30px',
    color: 'white', 
    backgroundColor: '#242424',
    borderBottom: '1px solid silver'
  },

  layoutContainer:{
    position: 'absolute',
    right: 85,
    top: 3,
  },

  layouts: {
    cursor: 'pointer',
    marginLeft: 3,
  }
}
export default SettingsBar;