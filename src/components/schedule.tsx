
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardQuestionCounter} from '../js/questionCounter';
import {getDaysAfter1970} from '../js/util';
import {cardsToRepeat} from '../js/cardsToRepeat';
import {getDayMonthFromInt} from '../js/dateHandling';
import dateHandling from '../js/dateHandling';
import '../CSS/schedule.scss';

interface dailySchedule {
  cards: any[],
  totalNrOfQuestions: number,
  daysFromNow: number,
}

export function Schedule():any{
  const Data:any = useSelector( (state:any)=> state.data)
  const numberOfDaysForward: number = 15;
  const [days, setDays] = useState<dailySchedule[]>([]);

  useEffect( ()=>{
    let arr: dailySchedule[] = [];

    for( let i =0; i< numberOfDaysForward; i++){
      let todayCards: any = cardsToRepeat( Data, getDaysAfter1970() + i, true);

      const obj: dailySchedule = {
        cards: [...todayCards],
        totalNrOfQuestions: cardQuestionCounter( todayCards ),
        daysFromNow: i
      }
      arr.push(obj);
    }
    setDays( arr );

  },[]) //eslint-disable-line

  return(
    <Container className='m-0 p-0' id="scheduleComponent" fluid >
      {days.map( (item:any, index:number)=>{
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

            { item.cards.map( (item2:any, index2:number)=>{ 
              return(
              <div key={index2}>
                <div className="lineContainer">
                  <span className="tags"> {item2.tags} </span>
                  <span className="nrOfCardQuestions">{ item2.questionAnswerPair.length >= 1 && !(item2.questionAnswerPair.length === 1 && item2.questionAnswerPair[0].question.text === "") ? item2.questionAnswerPair.length : 0 }</span>
                  <span className='creationDate creationDateDesktop'> {dateHandling.getDayMonthFromInt(item2.created) }</span>
                </div>

              </div>
            ) })}
            <div style={{ opacity: 0.1, boxShadow: '0px 1px 3px 2px black'}}></div>
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