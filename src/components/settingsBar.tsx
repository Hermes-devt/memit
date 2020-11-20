
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
  let location = useLocation();
  return(
    <div className="noselect" id="settingbar">
      <Timer />

      <span className={ location.pathname !== '/' ? "menu hideIt desktop" : 'menu desktop'} onClick={ ()=>{ 
        props.menuClick(); }} > 
        <Menu className="menuOpener" />
        <span className="menuString desktop" >{props.displayVerticalBar ? "Hide Menu" : "Display Menu"}</span>
      </span> 
      <Link to="/" className="homeButton mobile33" onClick={ ()=>{ props.onDisplayWindow( 1 ) }}>Home</Link>
  
      <span className="menuOptions">
        <Link to="/" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 1 ) }}>Home</Link>
        <Link to="/schedule" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 2 ) }}>Schedule</Link>
        <Link to="/search" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 3 ) }}>Search</Link>
        <Link to="/dailyNotes" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 5 ) }}>Daily</Link>
        <Link to="/note" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 6 ) }}>Staging</Link>
        <Link to="/laterlearnings" className="schedule" onClick={ ()=>{ props.onDisplayWindow( 4 ) }}>Later Learnings</Link>
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