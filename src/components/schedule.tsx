
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardsCounter, cardCounter} from '../js/questionCounter';
import {getDaysAfter1970} from '../js/util';
import {cardsToRepeat} from '../js/cardsToRepeat';
import {getDayMonthFromInt} from '../js/dateHandling';
import {Day} from '../types';

interface dailySchedule {
  cards: Day[],
  totalNrOfQuestions: number,
  daysFromNow: number,
}

export function Schedule():any{
  const data:any = useSelector( (state:any)=> state.data)
  const numberOfDaysForward: number = 14;
  const [days, setDays] = useState<dailySchedule[]>([]);

  useEffect( ()=>{
    let arr: dailySchedule[] = [];

    for( let i =0; i< numberOfDaysForward; i++){
      let todayCards: Day[] = cardsToRepeat( data, getDaysAfter1970() + i );

      const obj: dailySchedule = {
        cards: [...todayCards],
        totalNrOfQuestions: cardsCounter( todayCards ),
        daysFromNow: i
      }
      arr.push(obj);
    }
    setDays( arr );
  },[]) //eslint-disable-line

  return(
    <Container fluid className='m-0 p-0' style={{ backgroundColor: 'silver'}}>
      {days.map( (item: dailySchedule, index:number)=>{
        if( item.totalNrOfQuestions === 0 ) return <span key={index}></span> 

        return(
          <div key={index} className='pt-0- m-0'>
            <div style={{backgroundColor:'black', color: 'white', padding: '4px 4px'}}>
              <span style={{display: 'inline-block', paddingRight: 0, fontWeight: 'bold'}}>{getDayMonthFromInt( getDaysAfter1970() + item.daysFromNow )}</span>
              <span style={{color: 'orange'}}> - Total number of questions: {item.totalNrOfQuestions}</span>
            </div>

            { item.cards.map( (item2: Day, index2:number)=>{ return(
              <div key={index2}>
                <div style={{marginLeft: 20, fontWeight: 'bold'}}>
                  <span style={{display: 'inline-block', width: '400px'}}> {item2.tags} </span>
                  <span>{cardCounter( item2)} questions</span>
                </div>
              </div>
            ) })}
          </div>
        )
      })}
    </Container>
  )
}


export default Schedule;