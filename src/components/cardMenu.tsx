
import React, {useEffect} from 'react'


import VerticalBar from './contentarea/verticalBar';
import HorizontalDailyCards from './horizontalDailyCards';
// import { Switch, Route, useHistory, useLocation, withRouter} from "react-router-dom";

interface Props{
  displayVerticalBar: boolean;
  activeNote: number;
  data: any;
  mobile: boolean;
  setActiveNote(note:number): void;
}

export const CardMenu = (props: Props)=>{
  // const history = useHistory(); let location = useLocation();
  const hideVerticalBar = (): object => props.displayVerticalBar ? {display: 'block'} : {display: 'none'};
  
useEffect( ()=>{
  if( !props.data ) return;
  // console.log( 'data', props.data.dailyCards.length);

  document.addEventListener( 'keydown', listenForChangeOfCardHotkey);
  return ()=>{ document.removeEventListener('keydown', listenForChangeOfCardHotkey); }
},[props.data])

const listenForChangeOfCardHotkey = (evt:any)=>{
  const keyPress = evt.key;

  if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;

  if( keyPress === '0'){
    props.setActiveNote( props.data.list.length - 1);
    return;
  }

  if(keyPress > 0 && keyPress <= props.data.dailyCards.length ){
    const ID = props.data.dailyCards[keyPress-1].ID
    for( let i=0; i<props.data.list.length; i++){
      if( ID === props.data.list[i].onDay){
        props.setActiveNote( i );
        break;
      }
    }
  }
}
  const onMenuClick = ()=> { 
    // if( props.mobile){
    //   if( location.pathname === '/') 
    //     // setDisplayVerticalBar( displayVerticalBar=> !displayVerticalBar); 
    //   else                           history.push('/');
    // }else{
    //   setDisplayVerticalBar( displayVerticalBar=> !displayVerticalBar); 
    // }
  }

  return( <> {props.data && <span style={{position: 'relative'}}>
      <span style={hideVerticalBar()} >
        <VerticalBar onClick={(note:number)=> { props.setActiveNote(note) }} menuClick={ onMenuClick } activeNote={ props.activeNote } />
      </span> 

      {!props.displayVerticalBar && <HorizontalDailyCards onClick={(note:number)=> { props.setActiveNote(note) }} activeNote={props.activeNote} mobile={props.mobile} />}

      {/* when the window shrinks and the verticalMenu is not displaying without this it doesnt show up */}
      {props.displayVerticalBar && <span className="horizontalDailyCardHidder">
      <HorizontalDailyCards onClick={(note:number)=> { props.setActiveNote(note) }} activeNote={props.activeNote} mobile={props.mobile} />
      </span>}

    </span>} </>)
}

export default CardMenu;