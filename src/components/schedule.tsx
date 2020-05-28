
import React, {} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardsCounter, cardCounter} from '../js/questionCounter';
import {getDaysAfter1970} from '../js/util';
import {cardsToRepeat} from '../js/cardsToRepeat';
import {getDayMonthFromInt} from '../js/dateHandling';

export function Schedule(props:any):any{

  const data:any = useSelector( (state:any)=> state.data)
  if( !data) return null;

  let arr = [];
  for( let i =0; i< 10; i++){
    let todayCards = cardsToRepeat( data, getDaysAfter1970() + i );
    const obj = {
      cards: [...todayCards],
      totalNrOfQuestions: cardsCounter( todayCards ),
      daysFromNow: i
    }
    arr.push(obj);
  }

  return(
    <Container fluid className='m-0 p-0' style={ container}>
      {arr.map( (item, index)=>{
        return(
          <div key={index} className='pt-0- m-0'>
            <div style={{backgroundColor:'black', color: 'white', padding: '4px 4px'}}>
              <span style={{display: 'inline-block', paddingRight: 0, fontWeight: 'bold'}}>{getDayMonthFromInt( getDaysAfter1970() + item.daysFromNow )}</span>
              <span style={{color: 'orange'}}> - {item.totalNrOfQuestions} Questions</span>
            </div>

            { item.cards.map( (item2, index2)=>{ return(
              <div key={index2}>
                <div style={{marginLeft: 20, fontWeight: 'bold'}}>
                  <span style={{display: 'inline-block', width: '250px'}}> {item2.tags} </span>
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

const container = {
  backgroundColor: 'silver',
}


export default Schedule;