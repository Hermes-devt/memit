
import React, {CSSProperties} from 'react';
import {useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import { save, setDailyCards } from '../../js/storageHandling';
import {UserData} from '../../types';
import {Row, Col} from 'react-bootstrap';

type stringNumber = string | number;
export const Scheduler = ()=> { 
  const data = useSelector( (state:any)=> state.data);

  const [schedule, setSchedule] = useState<stringNumber[]>( data ? data.schedule: []);
  const dispatch = useDispatch();

  const onChange = (evt:any, index:number)=>{
    let val = evt.target.value;
    if( val.length > 0 && isNaN( Number(val)) ){
      return;
    }

    let _schedule = [...schedule];
    _schedule[index] = val;

    setSchedule( _schedule );

    const convertedSchedule: number[] = _schedule.map( (item: stringNumber, index:number): number=>{
      if( item === '') return 0;
      return Number(item);
    })

    let nData: UserData = {...data};
    nData.schedule = [...convertedSchedule];
    setDailyCards( nData );
    dispatch( setData(nData));
    save(nData);
  }

  return(
    <Container fluid style={container}> 
      <div className='text-center' style={{color: 'white'}}>Scheduler - Days from now</div>
      <div className='d-flex justify-content-center'>
        <Row className="no-gutters">
          {schedule && schedule.map( (item: stringNumber, index:number)=>{ return(
            <Col key={index}>
            <input type="text" 
              value={item === 0 ? 0 : item}
              style={inputBox}
              onChange={(evt)=> onChange(evt, index) }
            />
            </Col>
          )})}

        </Row>
      </div>
    </Container>
  )
}

const container: CSSProperties= {
  color: 'black',
  marginTop: 0,
}

const inputBox: CSSProperties = {
  width: 30,
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: 5,
  marginLeft: 5,
  borderRadius: 4,
  fontSize: 9,
  border: 'none',
  outline: 'none',
}

export default Scheduler;
