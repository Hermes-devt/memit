
import React, {CSSProperties, useEffect} from 'react'

import {useDispatch} from 'react-redux';
import {setData} from '../store/data/action';
import {save} from '../js/storageHandling';
import VerticalBar from './contentarea/verticalBar';
import HorizontalDailyCards from './horizontalDailyCards';
import { iUserClass } from '../templatesTypes';

interface Props{
  displayVerticalBar: boolean;
  activeNote: number;
  data: iUserClass;
  mobile: boolean;
  setActiveNote(note:number): void;
}

export const CardMenu = (props: Props)=>{
  const dispatch = useDispatch();

  
useEffect( ()=>{
  if( !props.data ) return;
  document.addEventListener( 'keydown', listenForChangeOfCardHotkey);
  return ()=>{ document.removeEventListener('keydown', listenForChangeOfCardHotkey); }
},[props]) //eslint-disable-line

const listenForChangeOfCardHotkey = (evt:any)=>{
  const keyPress = evt.key;

  if( document && document.activeElement && document.activeElement.tagName !== 'BODY') 
    return;

  if( keyPress === '0'){
    props.setActiveNote( props.data.get.list().length - 1);
    return;
  }

  if( keyPress === 'H'){
    for(let i =0; i<props.data.get.todaysCardToRepeat().length; i++){

      if( props.data.get.todaysCardToRepeat()[i].ID === props.data.get.list()[props.activeNote].cardID){
        // If at the first card , go to the daily card
        if( i === 0){
          props.setActiveNote(props.data.get.list().length-1);
          return;
        }

        // else go the the previous card
        let newID:number = props.data.get.todaysCardToRepeat()[i-1].ID;
        for(let i =0; i < props.data.get.list().length-1; i++){
          if( props.data.get.list()[i].cardID === newID){
            props.setActiveNote(i);
            return;
          }
        }
      }
    }

    // if at the daily card go the last of the daily cards
    if( props.data.get.todaysCardToRepeat().length >= 1 && props.activeNote === props.data.get.list().length-1){
      let lastcard:number = props.data.get.todaysCardToRepeat()[props.data.get.todaysCardToRepeat().length-1].ID
      for(let i =0; i < props.data.get.list().length; i++){
        if( props.data.get.list()[i].cardID === lastcard){
          props.setActiveNote(i);
          return;
        }
      }
    }

    return; 

  }
  
  if(keyPress === 'L'){
    for(let i =0; i<props.data.get.todaysCardToRepeat().length; i++){
      if( props.data.get.todaysCardToRepeat()[i].ID === props.data.get.list()[props.activeNote].cardID ){

        //if the activeCards is on the todays card go to the last of the daily cards
        if( i === props.data.get.todaysCardToRepeat().length-1){
          props.setActiveNote(props.data.get.list().length-1);
          return;
        }

        // if its on the list go the next (to the right) card of the daily cards
        let newID = props.data.get.todaysCardToRepeat()[i+1].ID;
        for(let i =0; i < props.data.get.list().length; i++){
          if( props.data.get.list()[i].cardID === newID){
            props.setActiveNote(i);
            return;
          }
        }
      }
    }

    // if on todays card go the first of the daily cards to repeat
    if( props.data.get.todaysCardToRepeat().length >= 1 && props.activeNote === props.data.get.list().length-1){
      let firstCard:number = props.data.get.todaysCardToRepeat()[0].ID
      for(let i =0; i < props.data.get.list().length; i++){
        if( props.data.get.list()[i].cardID === firstCard){
          props.setActiveNote(i);
          return;
        }
      }
    }

    return;  
  }

  if( keyPress === 'D'){
    for(let i =0; i<props.data.get.todaysCardToRepeat().length; i++){
      if( props.data.get.todaysCardToRepeat()[i].ID === props.data.get.list()[props.activeNote].cardID ){
        props.data.data.dailyCards[i].done = !props.data.data.dailyCards[i].done;
        const nData: iUserClass = {...props.data};
        dispatch( setData(nData));
        save( nData );
        break;
      }
    }
    return;
  }

  // Jump to specific daily card by pressing on its number in corresponding order
  if(keyPress > 0 && keyPress <= props.data.get.todaysCardToRepeat().length ){
    const ID:number = props.data.get.todaysCardToRepeat()[keyPress-1].ID

    for( let i=0; i<props.data.get.list().length; i++){
      if( ID === props.data.get.list()[i].cardID ){
        props.setActiveNote( i );
        break;
      }
    }
  }
}


  const hideVerticalBar = (): object => props.displayVerticalBar ? {display: 'block'} : {display: 'none'};

  return( <> {props.data && <span style={{position: 'relative'}}>
      <span style={hideVerticalBar()} >
        <VerticalBar 
          onClick={(note:number)=> { 
            props.setActiveNote(note) 
          }} 
          activeNote={ props.activeNote } 
        />
      </span> 

      <span className={ props.displayVerticalBar ? "horizontalDailyCardHidder" : "" }>
      <HorizontalDailyCards 
        onClick={(note:number)=> { 
          props.setActiveNote(note);
        }} 
        activeNote={props.activeNote} 
        mobile={props.mobile} 
      />
      </span>

    </span>} </>)
}

export default CardMenu;