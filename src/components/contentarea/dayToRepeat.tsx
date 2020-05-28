
import React, { CSSProperties, useEffect, useState} from 'react'
import {getDaysAfter1970} from '../../js/util';
import {Container, Row, Col} from 'react-bootstrap';
import {getDayMonthFromInt} from '../../js/dateHandling';

interface Props{
  onClick: (day: number)=> void;
}

export function DayToRepeat(props: any){
  const [active, setActive] = useState<number>(1);
  const [dayFrom, setDayFrom] = useState<number>(-1);
  const [elements, setElements] = useState<any>(['', '', '']);

  useEffect( ()=>{
    setElementFromStartValue(dayFrom);
  },[]) //eslint-disable-line

  useEffect( ()=>{
    toParent();
  },[active, dayFrom]); //eslint-disable-line

  const setElementFromStartValue = (value:number): void=>{
    let days = getDaysAfter1970();
    let arr = [value, value+1, value+2];
    let elements = arr.map( (day, index):string => getDayMonthFromInt(days + day));
    const dayFrom = value;
    setElements(elements);
    setDayFrom( dayFrom );
  }


  const shift = (dir:number)=>{
    if( active === 0 && dir < 0){
      setElementFromStartValue(dayFrom-1); return; 
    }

    if( active === 2 && dir > 0){
      setElementFromStartValue(dayFrom+1); return; 
    }
    setActive(active=> active+dir);
  }

  const toParent = ()=>{
    let days = getDaysAfter1970();
    days += (dayFrom + active);
    props.onClick( days );
  }

  return(
    <Container fluid style={{backgroundColor: '', paddingBottom: 5, paddingTop: 5, borderBottom: '1px solid black'}}>
      <Row className="text-center">
        <Col onClick={ ()=>{ shift(-1); }} style={styling.sBlock} >{"<"}</Col>

        {elements.map( (el:any, index:number)=>{
          let style = index === active ? {...styling.sBlock, ...styling.active} : styling.sBlock;
          let classStr = index === active ? '' : '';
          return <Col key={index}
            style={style} 
            className={classStr}
            onClick={ ()=>{ setActive(index); }}
            >{el}</Col>
        })}
        <Col style={styling.sBlock} onClick={ ()=>{ shift(1); }} >{">"}</Col>
      </Row>
    </Container>
  )
}

const styling = {
  sBlock: {
    cursor: 'pointer',
    width: '20%',
    padding: 0,
    fontSize: 15,
  } as CSSProperties,

  active: {
    backgroundColor: '', fontWeight: 'bold', color: 'black', textDecoration: 'underline', padding: '3px', borderRadius: 3, 
  } as CSSProperties,

}

export default DayToRepeat;