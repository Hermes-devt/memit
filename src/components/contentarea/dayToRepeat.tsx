
import React, {useEffect, useState} from 'react'
import {getDaysAfter1970} from '../../js/util';
import {Container, Row, Col} from 'react-bootstrap';
import {getDayMonthFromInt} from '../../js/dateHandling';
import '../../CSS/dayToRepeat.scss';

interface Props{ onClick: (day: number)=> void; }
export function DayToRepeat(props: Props){
  const [active, setActive] = useState<number>(1);//option of the 3 currently visible days in menu
  const [dayFrom, setDayFrom] = useState<number>(-1);
  const [elements, setElements] = useState<string[]>(['', '', '']);

  useEffect( ()=>{ setElementFromStartValue(dayFrom); },[]) //eslint-disable-line

  useEffect( ()=>{
    let todaysDay = getDaysAfter1970();
    todaysDay += (dayFrom + active);
    props.onClick( todaysDay );
  },[active, dayFrom]); //eslint-disable-line

  const setElementFromStartValue = (yesterdaysValue:number): void=>{
    let today = getDaysAfter1970();
    let yesterDayTodayTomorrow = [yesterdaysValue, yesterdaysValue+1, yesterdaysValue+2];
    let MonthOf_YesterDay_Today_Tomorrow = yesterDayTodayTomorrow.map( (day:number, index:number):string => getDayMonthFromInt(today + day));
    const dayFrom = yesterdaysValue;
    setElements(MonthOf_YesterDay_Today_Tomorrow);
    setDayFrom( dayFrom );
  }


  const shift = (dir:number)=>{
    if( active === 0 && dir < 0){ setElementFromStartValue(dayFrom-1); return; }
    if( active === 2 && dir > 0){ setElementFromStartValue(dayFrom+1); return; }
    setActive(active=> active+dir);
  }

  return(
    <Container fluid id="dayToRepeatContainer">
      <Row>
        <Col onClick={ ()=>{ shift(-1); }} className="option">{"<"}</Col>
        {elements.map( (dayOptions:string, index:number)=> 
          <Col key={index}
            className={ index === active ? "option active1" : "option"}
            onClick={ ()=>{ setActive(index); }}
          >{dayOptions}</Col>
        )}
        <Col className="option" onClick={ ()=>{ shift(1); }} >{">"}</Col>
      </Row>
    </Container>
  )
}

export default DayToRepeat;