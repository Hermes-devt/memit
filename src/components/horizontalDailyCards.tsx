import React, {useEffect, useState, CSSProperties} from 'react';
import {UserData, Day, iMissedCard, iCardsToRepeat} from '../types';
import {cardsToRepeat} from './../js/cardsToRepeat';
import {getDaysAfter1970} from './../js/util';

import {ReactComponent as CheckboxTrue} from './../IMG/checkTrue.svg';
import {ReactComponent as CheckboxFalse} from './../IMG/checkFalse.svg';


import {useSelector, useDispatch} from 'react-redux';

interface Props{
  activeNote: number;
  onClick(note:number): void;
}

export function HorizontalDailyCards(props: Props){
  const [daily, setDaily] = useState<any>([])
  const [checkBoxes, setCheckboxes] = useState<iCardsToRepeat[]>([]);
  const Data:any = useSelector<any>( (state: {data: UserData })=> state.data );
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data: UserData = Data;
    if( !data ) return;
    let todayCards: Day[] = cardsToRepeat( data, getDaysAfter1970());
    setDaily( todayCards );
    setCheckboxes( Data.dailyCards ); 
  },[]) //eslint-disable-line
  
  useEffect( ()=>{
    setCheckboxes( Data.dailyCards ); 
  },[Data]) 


  const cardClicked = (card:Day): void =>{
    let list = Data.list;
    let listLength = list.length;
    for(let i=0; i < listLength; i++){
      if( card !== list[i]) continue;
      props.onClick( i );
      break;
    }
  };

  const setTags = (tags:any): string => {
    if( typeof tags === 'object') tags = tags.join(', ');
    return tags;
  }

  const setStyle = (card: Day, index:number)=>{
    let _activeCard = Data.list[props.activeNote];
    return card === _activeCard ? {...cardStyle, ...active} : cardStyle;
  }

  return<div>
    { daily.map( (card: Day, index:number)=>{
      return (<span 
        onClick={()=>{ cardClicked( card); }}
        style={setStyle(card, index)}
        key={index}
      >
        <span >{setTags( card.tags)} </span>
        {checkBoxes[index].done && <span style={{position: 'absolute', right: 2, top: 0, width: 10, height: 10}} > <CheckboxTrue /> </span> }
        {!checkBoxes[index].done && <span style={{position: 'absolute', right: 2, top: 0, width: 10, height: 10}} > <CheckboxFalse /> </span> }
      </span>
    )})}
  </div>
}

const active ={
  // backgroundColor: 'black',
  fontWeight: 'bold',
  fontSize: 9,
} as CSSProperties

const cardStyle={
  position: 'relative',
  display: 'inline-block',
  backgroundColor: 'white',
  color: 'black',
  width: '100px', 
  height: '15px',
  borderRight: '1px solid silver',
  padding: '0px 7px', 
  paddingRight: 12,
  fontSize: 10,
  overflow:  'hidden',
  wordWrap: 'normal',
  textAlign: 'center',
  cursor: 'pointer',
} as CSSProperties

export default HorizontalDailyCards;