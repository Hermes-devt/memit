
import React, {CSSProperties} from 'react';
import {useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import { save, setDailyCards } from '../../js/storageHandling';

export const Scheduler = ()=> { 
  const data = useSelector( (state:any)=> state.data);

  const [schedule, setSchedule] = useState( data ? data.schedule: []);
  const dispatch = useDispatch();

  const saveChanges = (index:number, evt:any)=>{
    let schedule= [...data.schedule];
    let value = evt.target.value
    if( isNaN(value) && value.length > 0) return;
    schedule[index] = value;
    setSchedule(schedule);

    schedule = schedule.map( (item, index)=>{
      if( item === '') return 0;
      if( !isNaN(item) ) return parseInt(item);
      return data.schedule[index];
    })

    let nData = {...data};
    nData.schedule = schedule;
    setDailyCards( nData );
    dispatch( setData(nData));
    save(nData);
  }

  return(
    <Container fluid style={container}> 
      <div className='text-center' style={{color: 'white'}}>Scheduler - Days from now</div>
      <div className='d-flex justify-content-center'>
      {schedule && schedule.map( (item:number, index:number)=>{ return(
        <input key={index} type="text" 
          value={item === 0 ? 0 : item}
          style={inputBox}
          onChange={(evt)=>saveChanges(index, evt)}
        />
      )})}
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
  fontSize: 9,

}

export default Scheduler;
