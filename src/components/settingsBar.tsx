
import React, { useEffect, useState } from 'react';
import {ReactComponent as Layout1} from '../IMG/layout1.svg';
import {ReactComponent as Layout2} from '../IMG/layout2.svg';
import {ReactComponent as Layout3} from '../IMG/layout3.svg';
import {ReactComponent as Layout4} from '../IMG/layout4.svg';
import {ReactComponent as Menu} from '../IMG/menuWhite.svg';
import {Link} from 'react-router-dom';
import Timer from '../components/navbar/timer';
import { useLocation } from "react-router-dom";
import '../CSS/settingbar.scss';
import '../CSS/rightMenu.scss';


interface Props {
  onClick(nr:number): void,
  menuClick(): void,
  displayVerticalBar: boolean;
}

export function SettingsBar(props: Props):any{
  let location = useLocation();
  const [shiftDown, setShiftDown] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  useEffect( ()=>{
    document.addEventListener('keydown', listenOnMenuOption);
    document.addEventListener('keyup', listenForShiftUp);
    return ()=>{ 
      document.removeEventListener('keydown', listenOnMenuOption);
      document.removeEventListener('keyup', listenForShiftUp);
    }
  },[props, shiftDown]); //eslint-disable-line

  const listenForShiftUp = (evt:any)=>{
    if( evt.key === 'Shift') setShiftDown(false);
  }

  const listenOnMenuOption = (evt:any)=>{
    let keyPress = evt.code;

    if( evt.key === 'Shift'){ 
      setShiftDown(true);
      return;
    }
    if( !shiftDown ) return;
    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;
    // Switch through the daily cards to repeat
    switch( keyPress ){
      case 'Digit1': props.onClick(0); break;
      case 'Digit2': props.onClick(1); break;
      case 'Digit3': props.onClick(2); break;
      case 'Digit4': props.onClick(3); break;
      case 'Digit5': props.onClick(4); break;
    }
  }

  return(
    <div className="noselect" id="settingbar">
      <Timer />

      <span className={ location.pathname !== '/' ? "menu hideIt desktop" : 'menu desktop'} onClick={ ()=>{ 
        props.menuClick(); }} > 
        <Menu className="menuOpener" />
        <span className="menuString desktop" >{props.displayVerticalBar ? "Hide Menu" : "Display Menu"}</span>
      </span> 


      <Link to="/" className="homeButton mobile33" onClick={ ()=>{ setDisplayMenu(true); }} >Menu</Link>
  
      <span className="linkCollection">
        <Link to="/" className="schedule">Home</Link>
        <Link to="/schedule" className="schedule">Schedule</Link>
        <Link to="/search" className="schedule">Search</Link>
        <Link to="/dailyNotes" className="schedule">Daily</Link>
        <Link to="/note" className="schedule">Staging</Link>
        <Link to="/laterlearnings" className="schedule">Later Learnings</Link>
      </span>
  
      {/* switch through the different window interfaces */}
      <span className="layoutContainer">
        <span className="layoutIcon mobileIcon" style={{fontStyle: 'italic' }}onClick={ ()=> props.onClick(0)}>m</span>
        <span className="desktop layoutIcon" onClick={ ()=> props.onClick(2)}> <Layout1 className="viewOption" /> </span>
        <span className="layoutIcon desktop" onClick={ ()=> props.onClick(1)}> <Layout2 className="viewOption"  /> </span>
        <span className="layoutIcon" onClick={ ()=> props.onClick(3)}> <Layout3 className="viewOption"  /> </span>
        <span className="layoutIcon" onClick={ ()=> props.onClick(4)}> <Layout4  className="viewOption" /> </span>
      </span>


      {/* Mobile popup menu */}
      <div className="mobile">
          {displayMenu && <div className="mobile blackCover" onClick={ ()=> setDisplayMenu(false)}></div>}
          {displayMenu && <span className="popup">
            <div className="">
              <span onClick={ ()=> setDisplayMenu( false )}>
              <Link to="/" className="item" >Home</Link>
              <Link to="/schedule" className="item" >Schedule</Link>
              <Link to="/search" className="item" >Search</Link>
              <Link to="/dailyNotes" className="item" >Daily notes</Link>
              <Link to="/note" className="item" >Note</Link>
              <Link to="/laterLearnings" className="item" >Later learnings</Link>
              </span>
            </div>
          </span>
          }
      </div>
    </div>) 
}

export default SettingsBar;