
import React, {} from 'react';
import {ReactComponent as Layout1} from '../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../IMG/layout3.svg';
import {ReactComponent as Layout4} from '../IMG/layout4.svg';
import {ReactComponent as Menu} from '../IMG/menuWhite.svg';
import {Link} from 'react-router-dom';
import Timer from '../components/navbar/timer';
import RightMenu from './rightMenu';
import { useLocation } from "react-router-dom";
import '../CSS/settingbar.scss';


interface Props {
  onClick(nr:number): void,
  menuClick(): void,
  onDisplayWindow(window: number): void,
  displayVerticalBar: boolean;
  windowDisplay: number;
}

export function SettingsBar(props: Props):any{
  const hideOrDisplayMenuText = ()=> props.displayVerticalBar ? "Hide Menu" : "Display Menu"
  let location = useLocation();

  return(
    <div className="noselect" id="settingbar">
      <Timer />


      {/* {props.windowDisplay !== 1 && <div className="hideMenuOption"></div> } */}
  
      {/* <Link to="/" style={{color: 'white'}}> */}
        <span className="menu" onClick={ ()=>{ props.menuClick(); }} > 
          { location.pathname !== '/' && <div className="hideMenuOption" onClick={ (evt)=> evt.stopPropagation()}></div> }
          {/* <div className="hideMenuOption" onClick={ (evt)=> evt.stopPropagation()}></div> */}
          <Menu className="menuOpener" onClick={ ()=>{ ; }} />
          <span className="desktop" style={{paddingLeft: 10}}>{hideOrDisplayMenuText()}</span>
        </span>
      {/* </Link> */}
  
      <span className="menuOptions desktop">
        <Link to="/" style={{color: 'white'}}>
          <span className="schedule desktop" onClick={ ()=>props.onDisplayWindow( 1 ) }>Home</span>
        </Link>

        <Link to="/schedule" style={{color: 'white'}}>
          <span className="schedule desktop" onClick={ ()=>props.onDisplayWindow( 2 ) }>Schedule</span>
        </Link>

        <Link to="/search" style={{color: 'white'}}>
          <span className="schedule desktop" onClick={ ()=>props.onDisplayWindow( 3 ) }>Search</span>
        </Link>

        <Link to="/dailyNotes" style={{color: 'white'}}>
          <span className="schedule desktop" onClick={ ()=>props.onDisplayWindow( 5 ) }>Daily notes</span>
        </Link>

        <Link to="/laterlearnings" style={{color: 'white'}}>
          <span className="schedule desktop" onClick={ ()=>props.onDisplayWindow( 4 ) } >Later learnings</span>
        </Link>
      </span>
  
      <span className="layoutContainer">
        <span className="layout" onClick={ ()=> props.onClick(2)}> <Layout1 className="viewOption" /> </span>
        <span className="layout desktop" onClick={ ()=> props.onClick(1)}> <Layout2 className="viewOption"  /> </span>
        <span className="layout" onClick={ ()=> props.onClick(3)}> <Layout3 className="viewOption"  /> </span>
        <span className="layout" onClick={ ()=> props.onClick(4)}> <Layout4  className="viewOption" /> </span>
      </span>


      <RightMenu />
    </div>) 
}

export default SettingsBar;