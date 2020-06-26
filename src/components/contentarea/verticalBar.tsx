
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

interface Props{
  onClick(note:number): void,
  activeNote: number,
}

interface MissedCard { data: Day; done: boolean}

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
    todaysCardOrFullList: (e:any, card = null)=>{
      let _active = parseInt( e.target.getAttribute('data-index')); 
      let listIndex = list.length - 1 - _active;
      props.onClick( listIndex );
    },

    dailyCardsToRepeat: (card:any, evt:any)=>{
      const indexPos = parseInt( evt.target.getAttribute('data-index') );
      // Prevents the checkboxes to activate this function
      if( !indexPos && indexPos !== 0) return;
  

      const cardsToRepeat = todayCards;
      const isToday = getDaysAfter1970();

      if( activeDay === isToday){
        let data = Data.dailyCards;
        data.forEach( (item:any)=>{
          let cardID = cardsToRepeat[indexPos].onDay;
          if( item.ID === cardID ){ item.done = true; }
        })

        let nData = {...Data};
        nData.dailyCards = data;
        dispatch( setData(nData));
        save( nData );
      }
  
      let cardPressed = cardsToRepeat[indexPos];
      let _list = list;

      let listLength = _list.length;
      for(let i=0; i < listLength; i++){
        if( cardPressed !== _list[i]) continue;
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

      let nData = {...Data};
      nData.missedCards[index].done = true;
      dispatch( setData(nData) );
      save( nData );
    }
  }

  const onCheckbox = {
    missedCards: (index:number)=>{
      let nData = {...Data};
      nData.missedCards[index].done = !nData.missedCards[index].done;
      dispatch( setData(nData) );
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
    cardStyle: (index:number) => index === activeCard ? 
    {...styling.card, ...styling.active} as CSSProperties : {...styling.card} as CSSProperties,

    todaysCard: ()=> (activeCard === 0) ? 
      {...styling.card, ...styling.active, ...{textAlign: 'center', fontSize: 18}} as CSSProperties  : 
      {...styling.card, ...styling.passive, ...{textAlign: 'center', fontSize: 18}} as CSSProperties ,


    onMissingCards: (card: MissedCard )=>{ 
      let _activeCard: number = list.length - 1 - activeCard;

      let indexPos:number = -1;

      for(let I=0, len=data.list.length; I<len; I++){
        if(data.list[I] === card.data){
          indexPos = I; break; }
      }

      return indexPos === _activeCard ? 
        {...styling.card, ...styling.active} as CSSProperties  : 
        {...styling.card, ...styling.passive} as CSSProperties; 
    },

    todaysCardToRepeat: (card:any, index:number)=>{
      let todaysCard = card, _activeCard = list[activeCard];
      return todaysCard === _activeCard ? 
        {...styling.card, ...styling.active} as CSSProperties :
        {...styling.card, ...styling.passive} as CSSProperties;
    }
  }


  return (
    <Container fluid className="m-0 p-0 vh-100">
    <div>
      { todayCards && <React.Fragment>
          <div style={{ ...styling.card, ...styling.header} as CSSProperties}>Today</div>
          <div 
            style={ styles.todaysCard() } 
            data-index={0} 
            onClick={ onCard.todaysCardOrFullList }
            >Todays card</div>

          {cardsMissed.length > 0 && <div style={{ ...styling.card, ...styling.header} as CSSProperties}>Missed repeats</div> }

          {cardsMissed.map( (card: MissedCard, index:number)=>{ 
            return(
            <div key={index} 
              style={styles.onMissingCards(card)}
              onClick={ ()=> {
                onCard.onOneMissedCard(card, index) ;
              }} >
                <span style={{fontWeight: 'bold'}}>{ dateHandling.getDayMonthFromInt(card.data.onDay) } </span>
                <span> {card.data.tags.join(', ')}</span>

                <div 
                style={styling.checkbox as CSSProperties}
                onClick={ (ev)=> { 
                  ev.stopPropagation(); 
                  onCheckbox.missedCards(index) 
                }}
                > {card.done && <CheckboxTrue />}
                  {!card.done && <CheckboxFalse />}
                </div>
            </div>)

          })}

          <div 
            style={{ ...styling.card, ...styling.header} as CSSProperties}
            >Notes to repeat - ({todaysNumberOfQuestion})</div>
          <DayToRepeat onClick={ changeDayOfRepeat}/>

          { todayCards.map( (card: Day, index:number)=>{ 
            return(
            <div key={index} 
              style={ styles.todaysCardToRepeat(card, index)} 
              data-index={index} 
              onClick={ (evt)=>{ onCard.dailyCardsToRepeat(card, evt); }} 
              >
                <span style={{fontWeight: 'bold'}}>{dateHandling.getDayMonthFromInt(card.onDay) }</span>
                {/* - { card.tags.join(', ')} */}
                - { card.tags }

              { activeDay === getDaysAfter1970() && <span>
                {checkBoxes[index].done && 
                <div style={styling.checkbox as CSSProperties}
                  onClick={ ()=> { onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  ><CheckboxTrue /></div> }

                {!checkBoxes[index].done && <div style={styling.checkbox as CSSProperties}
                  onClick={ ()=> { onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  ><CheckboxFalse/></div> }
              </span> }
            </div>
          )})}
        </React.Fragment> 
      }

      { list && <React.Fragment>
        <div style={{...styling.card, ...styling.header} as CSSProperties}>Previous Days</div>
        {list.map( (card: Day, index:number)=>{ return(
          <div key={index} 
            style={ styles.cardStyle(index)}
            data-index={index}
            onClick={ onCard.todaysCardOrFullList }
          >
            <span style={{fontWeight: 'bold'}}>{dateHandling.getDayMonthFromInt(card.onDay) } </span>
            {/* - {card.tags.join(', ')} */}
            - {card.tags }
          </div>
      )})}
      </React.Fragment> }
    </div>
    </Container>
  );
}

const styling = {
  header: {
    backgroundColor: '#242424', 
    fontStyle: 'italic',
    textAlign: 'left',
    color: 'white',
    opacity: 1,
  },


  checkbox: {
    width: 16, 
    height: 16, 
    position: 'absolute', 
    bottom: 10, 
    right: 3,
  },

  card: {
    position: 'relative',
    padding: '5px 3px',
    borderBottom: '1px solid silver',
    cursor: 'pointer',
    fontSize: 13,
  },

  active: {
    color: 'white', backgroundColor: '#242424',
  },

  passive: {
    color: 'black',
    backgroundColor: 'white',
  }

}
 
export default Navbar;