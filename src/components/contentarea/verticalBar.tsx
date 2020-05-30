
import React, {useEffect, useState, CSSProperties } from 'react';
import {cardsToRepeat} from '../../js/cardsToRepeat';
import {getDaysAfter1970} from '../../js/util';
import DayToRepeat from './dayToRepeat';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';

import {ReactComponent as CheckboxTrue} from '../../IMG/checkTrue.svg';
import {ReactComponent as CheckboxFalse} from '../../IMG/checkFalse.svg';
import { cardsCounter } from '../../js/questionCounter';
import {Container} from 'react-bootstrap';


export function Navbar(props:any){
  const Data:any = useSelector<any>( state=> state.data );
  const dispatch = useDispatch();

  const [data, setData2] = useState<any>({});
  const [cardsMissed, setCardsMissed] = useState<any>([]);

  const [todayCards, setTodayCards] = useState<any>([]);
  const [checkBoxes, setCheckboxes] = useState<any>([]);

  const [list, setList] = useState<any>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  const [activeDay, setActiveDay] = useState<number>( getDaysAfter1970())

  const [todaysNumberOfQuestion, setTodaysNumberOfQuestion] = useState<number>(0);

  useEffect( ()=>{
    let data = Data;
    if( !data ) return;
    let todayCards = cardsToRepeat( data, getDaysAfter1970());
    let list= [...data.list];
    list.reverse();

    const cardsMissed = setMissedCards(data);
    setTodaysNumberOfQuestion( cardsCounter( todayCards ));

    setList(list);
    setData2(data);

    setTodayCards( todayCards ); setCheckboxes( Data.dailyCards ); 

    setCardsMissed( cardsMissed);
  },[Data]) // eslint-disable-line


  useEffect( ()=>{
    setActiveCard( Data.list.length - 1 - props.activeNote )
  }, [props.activeNote, Data.list.length])

  const setMissedCards = (data:any): any=>{
    let missedCardObj:any = [];
    data.missedCards.forEach( (card:any)=>{

      for(let i=0; i<data.list.length;i++){
        if( card.ID === data.list[i].onDay){
          const {tags, creationDate} = data.list[i];

          let arr = creationDate.split('-');
          let dateStr = parseInt(arr[2]) + "/" + parseInt(arr[1]);

          missedCardObj.push( {index: i, tags, date: dateStr, done: card.done, id: card.ID});
        }
      }
    });
    return missedCardObj;
  }


  const onCard = {
    todaysCardOrFullList: (e:any)=>{
      let _active = parseInt( e.target.getAttribute('data-index')); 
      let listIndex = list.length - 1 - _active;
      props.onClick( listIndex );
    },

    dailyCardsToRepeat: (evt:any)=>{
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

    onOneMissedCard: (card:any, setDone: boolean | undefined = undefined)=>{
      props.onClick( card.index);
      let cardMissed = cardsMissed;
      cardMissed.forEach( (m:any) =>{ if( m.id === card.id ){ m.done = setDone; } })

      setCardsMissed( cardMissed );

      
      let nData = Data;
      let missed = cardMissed.map( (item:any)=> { return {ID: item.id, done: item.done}});
      nData.missedCards = [...missed];
      dispatch( setData(nData) );
      save( nData );
    }
  }

  const onCheckbox = {
    missedCards: (card:any)=>{
      let cardMissed =  [...cardsMissed];
      cardMissed.forEach( (m:any) =>{ if( m.id === card.id ){ m.done = !m.done; } })

      setCardsMissed( cardMissed );
      let nData = Data;
      let missed = cardMissed.map( (item:any)=> { return {ID: item.id, done: item.done}});
      nData.missedCards = [...missed];
      dispatch( setData(nData) );
      save( nData );
    },

    todaysCards: (index:any, bool:any)=>{
      let cardsToRepeat = todayCards;
      let dailyCheckboxes = [...Data.dailyCards];
  
      dailyCheckboxes.forEach( (item:any)=>{
        let cardID = cardsToRepeat[index].onDay;
        if( item.ID === cardID ){item.done = !bool; }
      })
      let nData = Data;
      
      setCheckboxes( dailyCheckboxes)
      nData.dailyCards = dailyCheckboxes;
      dispatch( setData(nData));
      save( nData );
    }
  }

  const changeDayOfRepeat = (day:any)=>{
    const _active = 0;
    let _todayCards = cardsToRepeat(data, day);

    setActiveCard(_active);
    setActiveDay(day);
    setTodayCards( _todayCards);
  }

  const styles = {
    cardStyle: (index:number) => index === activeCard ? 
    {...styling.card, ...styling.active} as CSSProperties : {...styling.card} as CSSProperties,

    todaysCard: ()=> (activeCard === 0) ? 
      {...styling.card, ...styling.active, ...{textAlign: 'center', fontSize: 18}} as CSSProperties  : 
      {...styling.card, ...styling.passive, ...{textAlign: 'center', fontSize: 18}} as CSSProperties ,


    onMissingCards: (card:any)=>{ 
      let _activeCard = list.length - 1 - activeCard;
      return card.index === _activeCard ? 
      {...styling.card, ...styling.active} as CSSProperties  : 
      {...styling.card, ...styling.passive} as CSSProperties; },

    todaysCardToRepeat: (evt:any, index:number)=>{
      let todaysCard = evt, _activeCard = list[activeCard];
      return todaysCard === _activeCard ? 
        {...styling.card, ...styling.active} as CSSProperties :
        {...styling.card, ...styling.passive} as CSSProperties;
    }
  }

  const getCardString = (dayObject:any)=>{
    let yearMonthDay = dayObject.creationDate.split('-');
    let dayMonth = '' + parseInt(yearMonthDay[2]) + '/' + parseInt( yearMonthDay[1]);
    let dayMonth_tags = dayMonth + " - " + dayObject.tags;
    return dayMonth_tags;
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

          {cardsMissed.map( (card:any, index:number)=>{ return(
            <div key={index} 
              style={styles.onMissingCards(card)}
              data-index={card.index}
              onClick={ ()=> onCard.onOneMissedCard(card, true) } >
              <span>{card.date} - {card.tags}</span> 

                <div 
                // onClick={ (ev)=> { ev.stopPropagation(); onCard.onOneMissedCard(card, !card.done) }}
                onClick={ (ev)=> { ev.stopPropagation(); onCheckbox.missedCards(card) }}
                style={styling.checkbox as CSSProperties} > 
                  {card.done && <CheckboxTrue />}
                  {!card.done && <CheckboxFalse />}
                </div>
            </div>)

          })}

          <div 
            style={{ ...styling.card, ...styling.header} as CSSProperties}
            >Notes to repeat - ({todaysNumberOfQuestion})</div>
          <DayToRepeat onClick={ changeDayOfRepeat}/>

          { todayCards.map( (card:any, index:number)=>{ 
            return(
            <div key={index} 
              style={ styles.todaysCardToRepeat(card, index)} 
              data-index={index} 
              onClick={ onCard.dailyCardsToRepeat } 
              >{ getCardString(card)}


              { activeDay === getDaysAfter1970() && <span>
                {checkBoxes[index].done && 
                <div 
                  onClick={ ()=> { onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  style={styling.checkbox as CSSProperties}
                  ><CheckboxTrue /></div> }


                {!checkBoxes[index].done && <div 
                  onClick={ ()=> { onCheckbox.todaysCards(index, checkBoxes[index].done)}}
                  style={styling.checkbox as CSSProperties}
                  ><CheckboxFalse/></div> }
              </span> }
            </div>
          )})}
        </React.Fragment> 
      }

      { list && <React.Fragment>
        <div style={{...styling.card, ...styling.header} as CSSProperties}>Previous Days</div>
        {list.map( (card:any, index:number)=>{ return(
          <div key={index} 
            style={ styles.cardStyle(index)}
            data-index={index}
            onClick={ onCard.todaysCardOrFullList }
          >{ getCardString(card)}</div>
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