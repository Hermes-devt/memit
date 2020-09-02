import React, {useEffect, useState} from 'react';
import {Row} from 'react-bootstrap';
import {UserData, Day, iCardsToRepeat} from '../types';
import {cardsToRepeat} from './../js/cardsToRepeat';
import {getDaysAfter1970} from './../js/util';
import storage from '../store/data/action'
import {save} from '../js/storageHandling';
import {ReactComponent as CheckboxTrue} from './../IMG/checkTrue.svg';
import {ReactComponent as CheckboxFalse} from './../IMG/checkFalse.svg';
import {useSelector, useDispatch} from 'react-redux';
import '../CSS/horizontalDailyCards.scss'

interface Props{
  activeNote: number;
  onClick(note:number): void;
  mobile: boolean;
}

export function HorizontalDailyCards(props: Props){
  const [daily, setDaily] = useState<any>([])
  const [checkBoxes, setCheckboxes] = useState<iCardsToRepeat[]>([]);
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const [displayPopup, setDisplayPopup] = useState<boolean>( false );

  const [missedCards, setMissedCards] = useState<any>( [] );
  const [displayPopup2, setDisplayPopup2] = useState<boolean>( false );
  const dispatch = useDispatch();
  const mobile = 900;


  useEffect( ()=>{
    let data: UserData = {...Data};
    if( !data ) return;
    let todayCards: Day[] = cardsToRepeat( data, getDaysAfter1970());
    setDaily( todayCards );
    setCheckboxes( Data.dailyCards ); 

    const mobileBrowser:boolean = window.innerWidth <= mobile ? false : true;

    setDisplayPopup( mobileBrowser );

    // console.log( Data.missedCards);
    let arr = [];
    for( let i=0; i < Data.missedCards.length; i++){
      for( let i2=0; i2 < Data.list.length; i2++){
        if( Data.list[i2].onDay === Data.missedCards[i].ID){
          arr.push( Data.list[i2]);
          break;
        }
      }
    }

    setMissedCards(arr);
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
    let tagStr: string = ""

    tagStr = typeof tags === 'object' ? tags.join(', ') : tags;

    if(tagStr.length === 0) 
      tagStr = "No tags set";

    if( abbr || props.mobile ) return tagStr;
    return tagStr;
  }


  const setDailyCardStyle = (): string=>{
    const _activeCard = Data.list[props.activeNote];
    const todaysCard = Data.list.length > 0 ? Data.list.length - 1 : 0;
    const TODAY = Data.list[todaysCard];
    return _activeCard.onDay === TODAY.onDay ? "cardStyle cardStyleActive" : "cardStyle";
  }


    return(<span style={{display: 'block', position: 'relative'}}>
    {displayPopup && <div className="mobile blackCover" onClick={ ()=>{ setDisplayPopup( false ); }}></div>}
    {displayPopup2 && <div className="mobile blackCover" onClick={ ()=>{ setDisplayPopup2( false ); }}></div>}

    <span className="mobile popupOpener" onClick={ ()=>{ setDisplayPopup(true) }}>Daily Cards</span>

    {missedCards.length > 0 && <span className="mobile popupOpener" onClick={ ()=>{ setDisplayPopup2(true) }}>Missed Cards</span>}

    {displayPopup && <span className="noselect horizontalDailycards">
      <Row className='no-gutters'>
      <span className="desktop headline">Cards: </span>
      <div className="mobile headline">Cards to Repeat</div>
    <span 
      className={ setDailyCardStyle() }
      onClick={ ()=>{
        const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
        if( mobileBrowser ) setDisplayPopup( false );

        let list = Data.list;
        let todaysCard = list.length > 0 ? list.length - 1 : 0;
        props.onClick( todaysCard );
      }}>
        <span className="mobile">Daily new card</span>
        <span className="desktop">Todays</span>
    </span>


    { daily.map( (card: Day, index:number)=>{
      return ( <span
        title={ setTags(card.tags, true) }
        onClick={()=>{ 
          const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
          if( mobileBrowser ) setDisplayPopup( false );
          cardClicked( card); 
        }}


        className={ Data.list[props.activeNote] === card ? "cardStyle cardStyleActive" : "cardStyle" } 
        key={index}
      >
        <span >{setTags( card.tags)} </span>
        <span
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
        >
        {checkBoxes[index].done && <span className="checkbox" ><CheckboxTrue /> </span> }
        {!checkBoxes[index].done && <span className="checkbox" > <CheckboxFalse /> </span> }
        </span>
      </span>)
    })}
    </Row>
    </span>}



    {displayPopup2 && missedCards.length > 0 && <span className="noselect horizontalDailycards">
      <Row className='no-gutters'>
      <span className="desktop headline">Missed cards: </span>
      <div className="mobile headline">Missed Cards</div>

    { missedCards.map( (card: Day, index:number)=>{
      return ( <span
        title={ setTags(card.tags, true) }
        onClick={()=>{ 
          const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
          if( mobileBrowser ) setDisplayPopup2( false );
          cardClicked( card); 
        }}


        className={ Data.list[props.activeNote] === card ? "cardStyle cardStyleActive" : "cardStyle" } 
        key={index}
      >
        <span >{setTags( card.tags)} </span>
        <span
          onClick={ (ev:any)=>{
            ev.stopPropagation();
            let nData = {...Data};
            let _checkboxes = nData.missedCards;
            _checkboxes[index].done = !_checkboxes[index].done;

            _checkboxes[index].done = _checkboxes[index].done!;
            nData.missedCards = [..._checkboxes];
            dispatch( storage.setData(nData));
            save(nData);
          }}
        >
        {Data.missedCards[index].done && <span className="checkbox" ><CheckboxTrue /> </span> }
        {!Data.missedCards[index].done && <span className="checkbox" > <CheckboxFalse /> </span> }
        </span>
      </span>)
    })}
    </Row>
    </span>}

    </span>);

}

export default HorizontalDailyCards;