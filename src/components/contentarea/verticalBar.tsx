
import React, {useState, useEffect, createRef, useRef, CSSProperties } from 'react';
import {cardsToRepeat} from '../../js/cardsToRepeat';
import {getDaysAfter1970} from '../../js/util';
import DayToRepeat from './dayToRepeat';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';
import dateHandling from '../../js/dateHandling';

import {ReactComponent as CheckboxTrue} from '../../IMG/checkTrue.svg';
import {ReactComponent as CheckboxFalse} from '../../IMG/checkFalse.svg';
import {Container} from 'react-bootstrap';
import {tListItem, iMissedCard, iUserClass, iList, iListItem, iDailyCards } from '../../templatesTypes';
import '../../CSS/verticalBar.scss';


interface Props{
  onClick(note:number): void;
  activeNote: number;
}

interface MissedCard { 
  data: iListItem; 
  done: boolean;
}


export function Navbar(props: Props){
  const Data:any = useSelector<any>( (state: {data: iUserClass })=> state.data );
  const dispatch = useDispatch();

  const [daily, setDaily] = useState< iListItem[] > ([]);
  const [cardsMissed, setCardsMissed] = useState<MissedCard[]>([]);
  const [todayCards, setTodayCards] = useState<iDailyCards[]>([]);
  const [list, setList] = useState<iList>([]);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>( getDaysAfter1970())
  const [todaysNumberOfQuestion, setTodaysNumberOfQuestion] = useState<number>(0);

  const [ displayMissingCards, setDisplayMissingCards] = useState<boolean>(true);
  const [searchBox, setSearchBox] = useState<string>("");

  const textareaRef= useRef<any>(createRef());

  useEffect( ()=>{
    if( !Data ) return;
    setDisplayMissingCards( Data.get.settings().displayMissing );
  }, [])

  useEffect( ()=>{
    if( !Data ) return;

    let counter = 0;
    Data.get.todaysCardToRepeat().forEach( (item: any)=>{ counter += item.card.questionAnswerPair.length-1; })
    setTodaysNumberOfQuestion( counter );

    let list: iList = [...Data.get.list()];
    list.reverse();
    setList(list);
    setTodayCards(Data.get.todaysCardToRepeat())

    // const cardsMissed:MissedCard[] = setMissedCards(Data);
    // setCardsMissed( cardsMissed );
    setMissedCards(Data);

    setDaily( Data.get.todaysCards() );
  },[Data, searchBox, displayMissingCards]) // eslint-disable-line


  const setMissedCards = (data: iUserClass )=>{
    let missedCardObj: MissedCard[] = [];

    let list: iList = data.get.list();
    Data.data.missedCards.forEach( (card: iMissedCard)=>{
      for(let i=0; i<list.length;i++){
        if( card.ID === list[i].cardID ){
          missedCardObj.push( { 
            data: list[i], 
            done: card.done 
          })
          break;
        }
      }
    });

    setCardsMissed( missedCardObj );
    // return missedCardObj;
  }

  const clickedOnCard = (clickedCard: iListItem )=>{
    let indexPos:number = Data.get.indexFromCard2( clickedCard );
    setActiveCard(indexPos);
    props.onClick( indexPos );
  }

  const onCheckbox = {
    missedCards: (card: MissedCard)=>{

      cardsMissed.forEach( (missedCard: MissedCard, index:number, arr: MissedCard[])=>{
        if( missedCard.data.cardID === card.data.cardID ){
          arr[index].done = !arr[index].done;
          Data.data.missedCards[index].done = arr[index].done;
        }
      })
      dispatch( setData({...Data}) );
      setCardsMissed( [...cardsMissed]);
      dispatch( setData(Data));
      save( Data );
    },

    todaysCards: (index:number, bool:boolean)=>{
      todayCards[index].done =!bool;
      setTodayCards( [...todayCards]);
      Data.data.dailyCards = todayCards;
      dispatch( setData(Data));
      save( Data );
    }
  }

  const changeDayOfRepeat = (day:number)=>{
    if( day === Data.get.todaysCard().created){
      setTodayCards(Data.get.todaysCardToRepeat())
      setActiveDay(day);
      return;
    }

    let checkCardsToRepeatOnDay: iList = cardsToRepeat(Data, day);
    let todaysDayInNumber = getDaysAfter1970();
    checkCardsToRepeatOnDay = checkCardsToRepeatOnDay.filter( (y:iListItem)=> y.created !== todaysDayInNumber );

    let todays: iDailyCards[] = checkCardsToRepeatOnDay.map( (card: iListItem ): iDailyCards => ({
      ID: card.created, 
      done: false, 
      card: card
    }));

    setActiveDay(day);
    setTodayCards( todays );
  }

  const activeOrpassive = (card: iListItem):string=> card.cardID === Data.get.list()[props.activeNote].cardID ? "card active" : "card passive";

  const cardFilterStyle = (index:number):string =>{
  let indexPos = Data.get.list().length - index - 1;
    if( searchBox !== ''){
      if( JSON.stringify( Data.get.list()[indexPos].tags).match( new RegExp(searchBox, 'i') )){
        return indexPos === activeCard ? "card active" : "card";
      }else{
        return indexPos === activeCard ? "card active invisible" : "card invisible";
      }
    }
    return indexPos === props.activeNote ? "card active" : "card";
  }

  const setBackgroundColor = (index:number)=>{
    let indexPos = Data.get.list().length - index - 1;
    let day = Data.get.list()[indexPos]
    if( day && day.cardSetting !== undefined && day.cardSetting.pause !== undefined)
      return {backgroundColor: 'red', color: 'black'} as CSSProperties;
    return {backgroundColor: ''} as CSSProperties;

  }

  const closeOnClick = ()=>{
    // let elem = document.getElementById('verticalBar');
    // if( elem && elem.style){
    //   const style = window.getComputedStyle(elem);
    //   const pos = style.getPropertyValue('position');
    //   if( pos === 'absolute'){
    //     // props.menuClick();
    //   }
    // }
  }

  return (
    <Container fluid className="noselect" id="verticalBar">
    <div id="">
      { todayCards && <React.Fragment>
          <div className="card header">Today</div>
          { daily.map( (cardClass:any, index:number)=>{
            return(<div key={index}
              className={ activeOrpassive(cardClass)}

              onClick={ ()=> {
                let indexPos = Data.get.indexFromCard2( cardClass )
                setActiveCard(indexPos);
                props.onClick( indexPos );
                }} 
              >
                <span>
                  <span className="tags"> {dateHandling.getDayMonthFromInt(cardClass.created) } </span>
                  <span> - {cardClass.tags ? cardClass.tags : "No Tags set"} </span> 
                </span>

                {(0 === index) && <div id="createNewCard"
                  onClick={ ()=>{
                    let list: iList = Data.get.list();
                    let lastDay: iListItem = list[ list.length-1];
                    for( let i = list.length-1; i >= 0; i--){
                      if( lastDay.created !== list[i].created){
                        list.splice( i+1, 0, tListItem( list[i+1].cardID + 1) )
                        break;
                      }
                      if( i === 0){
                        list.push( tListItem( list[list.length-1].cardID + 1 ));
                        break;
                      }
                    }

                    let tList = [...list];
                    tList.reverse();
                    setList(tList);
                    setDaily( Data.get.todaysCards() );

                    Data.data.list = list;
                    dispatch( setData(Data));
                    save( Data );
                  }}
                  >+</div>
                }
            </div>)
          })}

          {cardsMissed.length > 0 && <span 
            style={{display: 'block', position: 'relative'}}
            onClick={ ()=>{
              let value = !displayMissingCards;
              setDisplayMissingCards( value )
              Data.get.settings().displayMissing = value;
              dispatch( setData(Data));
              save( Data );
            }}
            >
            <div className="card header">Missed repeats{cardsMissed.length > 0 ? " - (" + cardsMissed.length + ")" : ""}</div>
            {displayMissingCards && <div id="hideMissedCards" className="rotate-90">&lt;</div> }
            {!displayMissingCards && <div id="hideMissedCards">&lt;</div>}
          </span>}

          {displayMissingCards && cardsMissed.map( (card: any, index:number)=>{ 
            return(
            <div key={index} 
              className={activeOrpassive(card.data)}
              onClick={ (ev)=> {
                closeOnClick();
                ev.stopPropagation(); 
                clickedOnCard( card.data );
              }} >

                <span>
                  <span className="tags"> {dateHandling.getDayMonthFromInt(card.data.created) } </span>
                  <span> - {card.data.tags} </span> 
                </span>

                <div className="checkbox" 
                  onClick={ (ev)=> { 
                    ev.stopPropagation(); 
                    onCheckbox.missedCards(card) 
                  }}
                > {card.done && <CheckboxTrue />}
                  {!card.done && <CheckboxFalse />}
                </div>
            </div>)

          })}

          <div className="card header" >Notes to repeat - ({todaysNumberOfQuestion})</div>
          <DayToRepeat onClick={ changeDayOfRepeat}/>

          { todayCards.map( (card: iDailyCards, index:number)=>{ 
            return(
            <div key={index} 
              className={ activeOrpassive(card.card)}
              onClick={ ()=>{ 
                closeOnClick();
                clickedOnCard(card.card);
              }} > 

              <span>
                <span className="tags"> {dateHandling.getDayMonthFromInt(card.card.created) } </span>
                <span> - {card.card.tags} </span> 
              </span>

              { activeDay === getDaysAfter1970() && 
              <span style={{display: 'inline-block'}}>
                {card.done && 
                <div className="checkbox"
                  onClick={ (ev:any)=> { 
                    ev.stopPropagation(); 
                    onCheckbox.todaysCards(index, card.done)
                  }}
                  ><CheckboxTrue /></div> }

                {!card.done && <div className="checkbox"
                  onClick={ (ev:any)=> { 
                    ev.stopPropagation(); 
                    onCheckbox.todaysCards(index, card.done)
                  }}
                  ><CheckboxFalse/></div> }
                </span> 
                }
            </div>
          )})}
        </React.Fragment> 
      }

      { list && <React.Fragment>
        <div className="card header">Previous Days</div>
        <div>
          <input 
            onKeyDown={ (evt:any)=>{
              if( evt.key === 'Enter'){
                setSearchBox(evt.target.value);
              }
            }}
            ref={ textareaRef }
            id="searchBox" 
            tabIndex={-1}
            placeholder="Search" />
        </div>

        {list.map( (card: any, index:number)=>{ return(
          <div key={index} 
            className={cardFilterStyle(index)}
            style={ setBackgroundColor(index) }
            onClick={ ()=>{ 
              closeOnClick();
              clickedOnCard( card );
            }}
          > <span>
              <span className="tags"> {dateHandling.getDayMonthFromInt(card.created) } </span>
              <span> - {card.tags} </span> 

            </span>
          </div>
      )})}
      </React.Fragment> }
    </div>
    </Container>
  );
}

export default Navbar;