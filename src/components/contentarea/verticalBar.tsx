
import React, {useEffect, useState, CSSProperties } from 'react';
import {cardsToRepeat} from '../../js/cardsToRepeat';
import {getDaysAfter1970} from '../../js/util';
import DayToRepeat from './dayToRepeat';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';
import dateHandling from '../../js/dateHandling';

import {ReactComponent as CheckboxTrue} from '../../IMG/checkTrue.svg';
import {ReactComponent as CheckboxFalse} from '../../IMG/checkFalse.svg';
import { cardsCounter } from '../../js/questionCounter';
import {Container} from 'react-bootstrap';
import {UserData, Day, iMissedCard, iCardsToRepeat} from '../../types';
import '../../CSS/verticalBar.scss';


interface Props{
  onClick(note:number): void;
  activeNote: number;
  menuClick?(): void;
}

interface MissedCard { 
  data: Day; 
  done: boolean;
}

export function Navbar(props: Props){
  const Data:any = useSelector<any>( (state: {data: UserData })=> state.data );
  const dispatch = useDispatch();

  const [data, setData2] = useState<UserData>( Data );
  const [cardsMissed, setCardsMissed] = useState<MissedCard[]>([]);
  const [todayCards, setTodayCards] = useState<Day[]>([]);
  const [checkBoxes, setCheckboxes] = useState<iCardsToRepeat[]>([]);
  const [list, setList] = useState<Day[]>([]);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>( getDaysAfter1970())
  const [todaysNumberOfQuestion, setTodaysNumberOfQuestion] = useState<number>(0);

  useEffect( ()=>{
    let data: UserData = Data;
    if( !data ) return;

    let todayCards: Day[] = cardsToRepeat( data, getDaysAfter1970());
    let list: Day[] = [...data.list];
    list.reverse();

    const cardsMissed = setMissedCards(data);

    setTodaysNumberOfQuestion( cardsCounter( todayCards ));

    setList(list);
    setData2(data);

    // todayCards = todayCards.reverse();
    setTodayCards( todayCards ); 
    setCheckboxes( Data.dailyCards ); 

    setCardsMissed( cardsMissed );
  },[Data]) // eslint-disable-line


  useEffect( ()=>{
    setActiveCard( Data.list.length - 1 - props.activeNote )
  }, [props.activeNote, Data.list.length])


  const setMissedCards = (data: UserData ): MissedCard[]=>{
    let missedCardObj: MissedCard[] = [];

    data.missedCards.forEach( (card: iMissedCard)=>{
      for(let i=0; i<data.list.length;i++){
        if( card.ID === data.list[i].onDay){
          missedCardObj.push({ data: data.list[i], done: card.done })
          break;
        }
      }
    });
    return missedCardObj;
  }


  const onCard = {
    todaysCardOrFullList: (index:number)=>{
        let _active = index;
        let listIndex = list.length - 1 - _active;
        props.onClick( listIndex );
    },

    dailyCardsToRepeat: (card: Day)=>{
      let _list = list;

      let listLength = _list.length;
      for(let i=0; i < listLength; i++){
        if( card !== _list[i]) continue;
        let _active = i;
        let nonReverseListActive = listLength - 1 - _active;
        setActiveCard(_active);
        props.onClick( nonReverseListActive );
        break;
      }
    },

    onOneMissedCard: (card: MissedCard, index:number)=>{
      for( let I=0, len=Data.list.length; I<len; I++){
        if( Data.list[I].onDay === card.data.onDay ){
          props.onClick( I );
          break;
        }
      }
    }
  }

  const onCheckbox = {
    missedCards: (index:number)=>{
      let nData: UserData = Data;
      let CardsMissed = [...Data.missedCards]

      //Change the state in the global store object
      CardsMissed[index].done = !CardsMissed[index].done;
      nData.missedCards = [...CardsMissed ];
      dispatch( setData(nData) );

      //Change state on the local stage object.
      let temp = [...cardsMissed];
      temp[index].done = CardsMissed[index].done;
      setCardsMissed( temp );

      //save to storaage
      save( nData );
    },

    todaysCards: (index:number, bool:boolean)=>{
      let cardsToRepeat = todayCards;
      let dailyCheckboxes: iCardsToRepeat[] = [...Data.dailyCards];
  
      dailyCheckboxes.forEach( (item: iCardsToRepeat)=>{
        let cardID = cardsToRepeat[index].onDay;
        if( item.ID === cardID ){item.done = !bool; }
      })

      let nData: UserData = Data;
      setCheckboxes( dailyCheckboxes)
      nData.dailyCards = dailyCheckboxes;
      dispatch( setData(nData));
      save( nData );
    }
  }

  const changeDayOfRepeat = (day:number)=>{
    let _todayCards = cardsToRepeat(data, day);
    setActiveDay(day);
    setTodayCards( _todayCards);
    // const _active: number = 0; setActiveCard(_active);
  }

  const styles = {
    cardStyle: (index:number):string => index === activeCard ? "card active" : "card",
    todaysCard: (): string => (activeCard === 0) ? "card active extra" : "card passive extra",


    onMissingCards: (card: MissedCard ): string=>{ 
      let _activeCard: number = list.length - 1 - activeCard;

      let indexPos:number = -1;

      for(let I=0, len=data.list.length; I<len; I++){
        if(data.list[I] === card.data){
          indexPos = I; break; }
      }
      return indexPos === _activeCard ? "card active" : "card passive";
    },

    todaysCardToRepeat: (card:any, index:number)=>{
      let todaysCard = card, _activeCard = list[activeCard];
      return todaysCard === _activeCard ? "card active" : "card passive"
    }
  }
  const setTags = (tags:any): string => typeof tags === 'object' ? tags.join(', ' ) : tags;

  return (
    <Container fluid className="m-0 p-0 vh-100 noselect" id="verticalBar">
    <div>
      { todayCards && <React.Fragment>
          <div className="card header">Today</div>
          <div className={ styles.todaysCard() }
            onClick={ ()=>{ onCard.todaysCardOrFullList(0) }}
            >Todays card</div>

          {cardsMissed.length > 0 && <div className="card header">Missed repeats</div> }

          {cardsMissed.map( (card: MissedCard, index:number)=>{ 
            return(
            <div key={index} 
              className={ styles.onMissingCards(card)}
              onClick={ (ev)=> {
                ev.stopPropagation(); 
                onCard.onOneMissedCard(card, index) ;
              }} >
                <span style={{fontWeight: 'bold'}}>{ dateHandling.getDayMonthFromInt(card.data.onDay) } </span>
                <span> {card.data.tags.join(', ')}</span>

                <div className="checkbox"
                onClick={ (ev)=> { ev.stopPropagation(); onCheckbox.missedCards(index) 
                }}
                > {card.done && <CheckboxTrue />}
                  {!card.done && <CheckboxFalse />}
                </div>
            </div>)

          })}

          <div className="card header" >Notes to repeat - ({todaysNumberOfQuestion})</div>
          <DayToRepeat onClick={ changeDayOfRepeat}/>

          { todayCards.map( (card: Day, index:number)=>{ 
            return(
            <div key={index} 
              className={ styles.todaysCardToRepeat(card, index)}
              onClick={ ()=>{ onCard.dailyCardsToRepeat(card); }} 
              > 

              <span>
                <span className="tags"> {dateHandling.getDayMonthFromInt(card.onDay) } </span>
                <span> - {setTags( card.tags )} </span> 
              </span>

              { activeDay === getDaysAfter1970() && <span>
                {checkBoxes[index].done && 
                <div className="checkbox"
                  onClick={ (ev:any)=> { 
                    ev.stopPropagation(); 
                    onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  ><CheckboxTrue /></div> }

                {!checkBoxes[index].done && <div className="checkbox"
                  onClick={ (ev:any)=> { 
                    ev.stopPropagation(); 
                    onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  ><CheckboxFalse/></div> }
              </span> }
            </div>
          )})}
        </React.Fragment> 
      }

      { list && <React.Fragment>
        <div className="card header">Previous Days</div>
        {list.map( (card: Day, index:number)=>{ return(
          <div key={index} 
            className={styles.cardStyle(index)}
            onClick={ ()=>{ onCard.todaysCardOrFullList(index) } }
          > <span>
              <span className="tags"> {dateHandling.getDayMonthFromInt(card.onDay) } </span>
              <span> - {setTags( card.tags )} </span> 
            </span>
          </div>
      )})}
      </React.Fragment> }
    </div>
    </Container>
  );
}

export default Navbar;