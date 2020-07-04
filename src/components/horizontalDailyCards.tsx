import React, {useEffect, useState, CSSProperties} from 'react';
import {UserData, Day, iCardsToRepeat} from '../types';
import {cardsToRepeat} from './../js/cardsToRepeat';
import {getDaysAfter1970} from './../js/util';
import storage from '../store/data/action'

import {save} from '../js/storageHandling';
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
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data: UserData = {...Data};
    if( !data ) return;
    let todayCards: Day[] = cardsToRepeat( data, getDaysAfter1970());
    setDaily( todayCards );
    setCheckboxes( Data.dailyCards ); 
  },[]) //eslint-disable-line
  
  useEffect( ()=>{
    setCheckboxes( [...Data.dailyCards] ); 
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

  const setTags = (tags:any, abbr:boolean=false): string => {
    if( typeof tags === 'object') tags = tags.join(', ');

    if( abbr ) return tags;
    if( tags.length > 14){
      tags = tags.substring(0, 12);
      tags += '..';
    }
    return tags;
  }

  const setStyle = (card: Day, index:number)=>{
    let _activeCard = Data.list[props.activeNote];
    return card === _activeCard ? {...cardStyle, ...active} : cardStyle;
  }

  return<span>
    <span style={{fontWeight: 'bold', fontSize: 15, paddingLeft: 5}}>Daily cards:</span>
    { daily.map( (card: Day, index:number)=>{
      return (<abbr
        title={ setTags(card.tags, true) }
        onClick={()=>{ cardClicked( card); }}
        style={setStyle(card, index)}
        key={index}
      >
        <span >{setTags( card.tags)} </span>
        {checkBoxes[index].done && 
          <span style={{position: 'absolute', right: 2, top: 4, width: 10, height: 10}} 
          onClick={ (ev:any)=>{
            ev.stopPropagation();
            let nData = {...Data};
            let _checkboxes = [...checkBoxes];
            _checkboxes[index].done = !_checkboxes[index].done;
            setCheckboxes( _checkboxes);
            nData.dailyCards = [..._checkboxes];
            dispatch( storage.setData(nData));
            save(nData);
          }}
          ><CheckboxTrue /> </span> }
        {!checkBoxes[index].done && 
        <span style={{position: 'absolute', right: 2, top: 4, width: 10, height: 10}} 
          onClick={ (ev:any)=>{
            ev.stopPropagation();
            let nData = {...Data};
            let _checkboxes = [...checkBoxes];
            _checkboxes[index].done = !_checkboxes[index].done;
            setCheckboxes( _checkboxes);

            nData.dailyCards = [..._checkboxes];
            dispatch( storage.setData(nData));
            save(nData);
          }}
        > <CheckboxFalse /> </span> }
      </abbr>
    )})}
  </span>
}

const active ={
  // backgroundColor: 'black',
  fontWeight: 'bold',
  // color: 'white',
  fontSize: 9,
} as CSSProperties

const cardStyle={
  verticalAlign: 'top',
  display: 'inline-block',
  position: 'relative',
  color: 'black',
  width: '100px', 
  height: '25px',
  borderRight: '1px solid silver',
  paddingTop: '6px',
  paddingLeft: '5px',
  paddingRight: '12px',
  fontSize: 10,
  overflow:  'hidden',
  wordWrap: 'normal',
  textAlign: 'center',
  cursor: 'pointer',
} as CSSProperties

export default HorizontalDailyCards;