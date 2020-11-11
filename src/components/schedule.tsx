
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardsCounter, cardCounter} from '../js/questionCounter';
import {getDaysAfter1970} from '../js/util';
import {cardsToRepeat} from '../js/cardsToRepeat';
import {getDayMonthFromInt} from '../js/dateHandling';
import dateHandling from '../js/dateHandling';
import {iDay} from '../templatesTypes';
import '../CSS/schedule.scss';

interface dailySchedule {
  cards: iDay[],
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
      let todayCards: iDay[] = cardsToRepeat( data, getDaysAfter1970() + i, true);

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
    <Container className='m-0 p-0' id="scheduleComponent" fluid >
      {days.map( (item: dailySchedule, index:number)=>{
        if( item.totalNrOfQuestions === 0 ) return <span key={index}></span> 
        return(
          <div key={index} className='pt-0- m-0'>
            <div className="scheduleHeader">
              <span className="date">
                <span style={{color: ''}}>Date: </span> 
                <span style={{paddingLeft: 3}}>
                  {getDayMonthFromInt( getDaysAfter1970() + item.daysFromNow )}
                </span>
                </span>
              <span className="nrOfQuestionsHeadline">Questions</span>
              <span className="creationDateHeadline creationDateDesktop">Created</span>

            </div>

            { item.cards.map( (item2: iDay, index2:number)=>{ 
              return(
              <div key={index2}>
                <div className="lineContainer">
                  <span className="tags"> {item2.tags.join(', ')} </span>
                  <span className="nrOfCardQuestions">{cardCounter( item2)}</span>
                  <span className='creationDate creationDateDesktop'> {dateHandling.getDayMonthFromInt(item2.onDay) }</span>
                </div>

              </div>
            ) })}
            {/* <div style={{backgroundColor: 'orange', borderTop: '1px solid black'}}> */}
            <div className="total">
              <span className="tags">Total:</span>
              <span className="nrOfCardQuestions" style={{color: ''}}>{item.totalNrOfQuestions}</span>
            </div>
          </div>
        )
      })}
    </Container>
  )
}


export default Schedule;