
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

    {/* Makes the menu unclickable and make it look transparant. */}
    {props.scheduleOn && <div style={styles.hideIt as CSSProperties}></div> }

    <span style={styles.menu as CSSProperties} onClick={ ()=>{ props.menuClick() }} > 
      <Menu />
      {props.displayVerticalBar && <span style={{ paddingLeft: 10,}}>Hide menu</span>}
      {!props.displayVerticalBar && <span style={{paddingLeft: 10,}}>Display menu</span> }
    </span>


    <span style={{...styles.schedule, ...{}}} onClick={ ()=>props.onSchedule( false ) }>Home</span>
    <span style={styles.schedule} onClick={ ()=>props.onSchedule( true ) }>Schedule</span>

    <div style={styles.layoutContainer as CSSProperties}>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(2)}> <Layout1 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(1)}> <Layout2 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(3)}> <Layout3 /> </span>
      <span style={ styles.layouts} onClick={ ()=> props.onClick(4)}> <Layout4 /> </span>
    </div>
  </div>)
}


const styles = {
  hideIt:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: 130,
    height: '100%',
    backgroundColor: '#242424',
    opacity: 0.8,
  },

  menu: {
    display: 'inline-block',
    marginLeft: 10,
    width: 125,
    cursor: 'pointer',
    borderRight: '1px solid silver',
  },


  schedule: {
    display: 'inline-block',
    position: 'relative', 
    cursor: 'pointer',
    padding: '3px 5px 2px 10px',
  } as CSSProperties,

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