import React, {useEffect, useState} from 'react';
import {Row} from 'react-bootstrap';
import {iList, iListItem, iUserClass, iDailyCards} from '../templatesTypes';
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

interface iMissedCards{
  card: iListItem;
  done: boolean;
}

export function HorizontalDailyCards(props: Props){
  const [daily, setDaily] = useState<any>([])
  const Data: any = useSelector<any>( (state: {data: iUserClass })=> state.data );
  const [displayPopup, setDisplayPopup] = useState<boolean>( false );

  const [missedCards, setMissedCards] = useState<iMissedCards[]>( [] );
  const [displayPopup2, setDisplayPopup2] = useState<boolean>( false );
  const dispatch = useDispatch();
  const mobile = 800;


  useEffect( ()=>{
    if( !Data ) return;

    setDaily( Data.get.todaysCardToRepeat() );
    const mobileBrowser:boolean = window.innerWidth <= mobile ? false : true;
    setDisplayPopup( mobileBrowser );

    let missed: iMissedCards[] = [];
    Data.data.missedCards.forEach( (card: any, index:number)=>{
      for( let i =0; i<Data.get.list().length; i++){
        if( Data.get.list()[i].cardID === card.ID ){
          missed.push( { card: Data.get.list()[i], done: card.done});
        }
      }
    });

    setMissedCards( missed );
  },[]) //eslint-disable-line


  const setDailyCardStyle = (): string=>{
    let list: iList = Data.get.list();
    return list[props.activeNote] === Data.get.todaysCard() ? "cardStyle cardStyleActive" : "cardStyle";
  }


  return(<span id="horinzontalDailyCard" style={{display: 'block', position: 'relative'}}>
    {(displayPopup || displayPopup2) && <div className="mobile blackCover" onClick={ ()=>{ setDisplayPopup2(false); setDisplayPopup( false ); }}></div>}

    <span className="mobile popupOpener" onClick={ ()=>{ setDisplayPopup(true) }}>Daily Cards</span>
    {missedCards.length > 0 && <span className="mobile popupOpener" onClick={ ()=>{ setDisplayPopup2(true) }} >Missed Cards</span>}

    {displayPopup && <span className="noselect horizontalDailycards">
      <Row className='no-gutters'>
      <div className="mobile headline">Cards to Repeat</div>
      <span className={ setDailyCardStyle() }
        onClick={ ()=>{
          const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
          if( mobileBrowser ) setDisplayPopup( false );
          let list: iList = Data.get.list();
          let todaysCard = list.length > 0 ? list.length - 1 : 0;
          props.onClick( todaysCard );
      }}>
        <span className="mobile">Daily new card</span>
        <span className="desktop">Todays</span>
    </span>


    { daily.map( (card: any, index:number)=>{
      return ( <span
        title={ card.card.tags }
        onClick={()=>{ 
          const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
          if( mobileBrowser ) setDisplayPopup( false );
          let list: iList = Data.get.list();
          for(let i=0; i < list.length; i++){
            if( card.card.cardID !== list[i].cardID) 
              continue;
            props.onClick( i );
            break;
          }
          
        }}
        className={ Data.get.list()[props.activeNote].cardID === card.card.cardID ? "cardStyle cardStyleActive" : "cardStyle" } 
        key={index}
      >
        <span className="">{ card.card.tags }</span>
        <span
          onClick={ (ev:any)=>{
            ev.stopPropagation();
            Data.data.dailyCards.forEach( (dailys: iDailyCards, index:number, arr:iDailyCards[])=>{
              if( dailys.card.cardID === card.card.cardID){
                arr[index].done = !arr[index].done
              }
            })
            setDaily( Data.data.dailyCards );
            dispatch( storage.setData({...Data}));
            save(Data);
          }}
        >
        {card.done && <span className="checkbox" ><CheckboxTrue /> </span> }
        {!card.done && <span className="checkbox" > <CheckboxFalse /> </span> }
        </span>
      </span>)
    })}
    </Row>
    </span>}

    </span>);
    {/* {(missedCards.length > 0) && <span className="noselect horizontalDailycards"> */}
    {/* {displayPopup2 && missedCards.length > 0 && <span className="noselect horizontalDailycards"> */}
      {/* <Row className='no-gutters'>
      <div className="mobile headline">AAMissed Cards</div>

    <div style={{display: 'none', overflowX: 'scroll', overflowY: 'hidden', height: '35px', width: '2000px'}}>
    { missedCards.map( (card: iMissedCards, index:number)=>{
      return ( <span
        title={ card.card.tags }
        onClick={()=>{ 
          const mobileBrowser:boolean = window.innerWidth <= mobile ? true : false
          if( mobileBrowser ) setDisplayPopup2( false );
          let indexPos: number = Data.get.indexFromCard2( card.card )
          props.onClick( indexPos );
        }}
        className={ Data.data.list[props.activeNote] === card.card ? "cardStyle cardStyleActive" : "cardStyle" } 
        key={index}
      >

        <span >{card.card.tags}</span>
        <span
          onClick={ (ev:any)=>{
            ev.stopPropagation();
            Data.data.missedCards.forEach( (item:any, index:number, arr:any)=>{
              if( item.ID === card.card.created){
                let missedCards2 = [...missedCards];
                missedCards2[index].done = !missedCards[index].done;
                arr[index].done = missedCards2[index].done;
                setMissedCards( missedCards2);
              }
            })
            dispatch( storage.setData({...Data}));
            save(Data);
          }}
        >
        {card.done && <span className="checkbox" ><CheckboxTrue /> </span> }
        {!card.done && <span className="checkbox" > <CheckboxFalse /> </span> }
        </span>
      </span>)
    })}
    </div>
    </Row> */}
    {/* </span>} */}

    // </span>);

}

export default HorizontalDailyCards;