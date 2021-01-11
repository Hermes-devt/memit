
import React, {useState } from 'react';
import {Container} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import { save } from '../../js/storageHandling';
import {iUserClass} from '../../templatesTypes';

type stringNumber = string | number;

interface Props{
  data: iUserClass;
}

export const Scheduler = (props: Props)=> { 

  const [schedule, setSchedule] = useState<stringNumber[]>( props.data ? props.data.get.schedule(): []);
  const [displayNrOfBoxes, setDisplayNrOfBoxes] = useState<number>(7);
  const dispatch = useDispatch();


  const onChange = (evt:any, index:number)=>{
    let val = evt.target.value;
    if( val.length > 0 && isNaN( Number(val)) ){
      return;
    }

    let _schedule = [...schedule];
    _schedule[index] = val;

    setSchedule( _schedule );

    const convertedSchedule: number[] = _schedule.map( (item: stringNumber): number=>{
      if( item === '') return 0;
      return Number(item);
    })

    props.data.set.schedule( convertedSchedule );
    dispatch( setData({...props.data}));
    save(props.data);
  }

  return(
    <Container fluid id="schedulerContainer" style={{paddingTop: ''}}> 
      <div style={{position: 'absolute', top: '20px', right: '10px' }}>

        <span className=''>Schedule:</span>
        <div className='' style={{display: 'inline-block', position: 'relative', top: '-2px', marginRight: '3px', opacity: '0.7'}}>
            {schedule && schedule.map( (item: stringNumber, index:number)=>{ 
              if( index >= displayNrOfBoxes) return <span key={index}></span>
              return( <input type="text" key={index} style={{ backgroundColor: 'black', boxShadow: '1px 1px 1px black', border: '1px solid silver', color: 'white'}}
                value={item === 0 ? 0 : item}
                onChange={(evt)=> onChange(evt, index) }
              />
            )})}
        </div>
        <span style={{cursor: 'pointer'}} onClick={ ()=>{
          if( displayNrOfBoxes === 100 ) setDisplayNrOfBoxes( 8 );
          else setDisplayNrOfBoxes( 100 );
        }}>...</span>

    </div>
    </Container>
  )
}
export default Scheduler;
