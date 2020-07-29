
import React, {} from 'react';
import {ReactComponent as Layout1} from '../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../IMG/layout3.svg';
import {ReactComponent as Layout4} from '../IMG/layout4.svg';
import {ReactComponent as Menu} from '../IMG/menuWhite.svg';
import Timer from '../components/navbar/timer';
import '../CSS/settingbar.scss';


interface Props {
  onClick(nr:number): void,
  menuClick(): void,
  onDisplayWindow(window: number): void,
  displayVerticalBar: boolean;
  windowDisplay: number;
  mobile: boolean;
}

export function SettingsBar(props: Props):any{
  if( !props.mobile ) return desktopInterface(props);
  else return mobileInterface(props);
}

const mobileInterface = (props: Props )=>{
  return(
    <div id="settingbar">
     <Timer />
      <span style={{display: 'inline-block', marginLeft: 5}}
        > <Menu onClick={ ()=>{ props.menuClick(); }} /> </span>

      <span style={{position: 'absolute', right: 80, top: 3, opacity: 1}}>
        <span className="layout" onClick={ ()=> props.onClick(2)}> <Layout1 /> </span>
        <span className="layout" onClick={ ()=> props.onClick(3)}> <Layout3 /> </span>
        <span className="layout" onClick={ ()=> props.onClick(4)}> <Layout4 /> </span>
      </span>
    </div>
  )
}

const desktopInterface = (props: Props)=>{

  const hideOrDisplayMenuText = ()=> props.displayVerticalBar ? "Hide Menu" : "Display Menu"

  return(
    <div className="noselect" id="settingbar">
      <Timer />
  
      {props.windowDisplay !== 1 && <div className="hideMenuOption"></div> }
  
      <span className="menu" onClick={ ()=>{ props.menuClick() }} > 
        <Menu onClick={ ()=>{ console.log('clicked on the menu icon!') }} />
        <span style={{paddingLeft: 10}}>{hideOrDisplayMenuText()}</span>
      </span>
  
      <span className="menuOptions">
        <span className="schedule" onClick={ ()=>props.onDisplayWindow( 1 ) }>Home</span>
        <span className="schedule" onClick={ ()=>props.onDisplayWindow( 2 ) }>Schedule</span>
        <span className="schedule" onClick={ ()=>props.onDisplayWindow( 3 ) }>Search</span>
        <span className="schedule" onClick={ ()=>props.onDisplayWindow( 5 ) }>Daily notes</span>

      <span className="schedule" onClick={ ()=>props.onDisplayWindow( 4 ) } >Later learnings</span>
      </span>
  
      <span style={{position: 'absolute', right: 85, top: 3, opacity: 1}}>
        <span className="layout" onClick={ ()=> props.onClick(2)}> <Layout1 /> </span>
        <span className="layout" onClick={ ()=> props.onClick(1)}> <Layout2 /> </span>
        <span className="layout" onClick={ ()=> props.onClick(3)}> <Layout3 /> </span>
        <span className="layout" onClick={ ()=> props.onClick(4)}> <Layout4 /> </span>
      </span>
    </div>) 
}

export default SettingsBar;