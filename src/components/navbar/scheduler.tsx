
import React from 'react';
import {useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';

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
    dispatch( setData(nData));
  }

  return(
    <Container fluid > 
      <div className='text-center'>Scheduler - Days from now</div>

      <div className='d-flex justify-content-center'>
      {schedule && schedule.map( (item:number, index:number)=>{ return(
        <input key={index} type="text" 
          value={item === 0 ? 0 : item}
          style={{ width: '40px', textAlign: 'center', cursor: 'pointer', marginTop: '5px', marginLeft: '5px'}} 
          onChange={(evt)=>saveChanges(index, evt)}
        />
      )})}
      </div>
    </Container>
  )
}

export default Scheduler;
