import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import { save, setDailyCards } from '../../js/storageHandling';
import {Container, Row} from 'react-bootstrap';
import '../../CSS/topbar.scss';
import { iUserClass } from '../../templatesTypes';


type stringNumber = string | number;

interface Props{
  data: iUserClass;
}

export const Topbar = (props: Props)=>{
  const [schedule, setSchedule] = useState<stringNumber[]>( props.data ? props.data.get.schedule(): []);
  const [displayNrOfBoxes, setDisplayNrOfBoxes] = useState<number>(9);
  const [mobile, setMobile] = useState<boolean>(false)
  const dispatch = useDispatch();


  // Set if the window is mobile
  useEffect( ()=>{
    if( window.innerWidth < 620 ){
      setDisplayNrOfBoxes( 0 );
      setMobile(true);
    }
  }, [])

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>, index:number)=>{
    let val:string = evt.target.value;
    if( val.length > 0 && isNaN( Number(val)) ){
      return;
    }

    let _schedule = [...schedule];
    _schedule[index] = val;

    const convertedSchedule: number[] = _schedule.map( (item: stringNumber, index:number): number=>{
      if( item === '') return 0;
      return Number(item);
    })

    setSchedule( convertedSchedule );
    props.data.set.schedule( convertedSchedule)
    setDailyCards(props.data);
    dispatch( setData({...props.data}));
    save( props.data  );
  }

  const displayText = ():boolean=> ( mobile && displayNrOfBoxes > 6 ) ? false : true;
  

  const openClose = ()=>{
    if( mobile ) setDisplayNrOfBoxes( displayNrOfBoxes > 6 ? 0 : 11 )
    else setDisplayNrOfBoxes( displayNrOfBoxes < 10 ?  100 : 9);
  }

  return( <Container fluid id='topbar'>
      <Row>
        {displayText() && <Link to="/" className="noselect" id="topbarHeadline"><h1>Repeat Learnings</h1></Link>}

          <div id="schedulerContainer">

              {displayText() && <span className='noselect pointer'
                onClick={ ()=>{ openClose(); }}
              >Schedule</span>}

              {!displayText() && <span className='pointer noselect closeExpandedArea' 
              onClick={ ()=>{ openClose(); }}
              >X</span>}

              <div className='scheduleInputs'>
                  {schedule && schedule.map( (item: stringNumber, index:number)=>{ 

                    if( index >= displayNrOfBoxes) 
                      return <span key={index}></span>

                    return( <input type="text" key={index} 
                      value={item === 0 ? 0 : item}
                      onChange={(evt)=> onChange(evt, index) }
                    />
                  )})}
              </div>
              {displayText() && <span className="pointer" onClick={ ()=>{ openClose(); }}>...</span>}
          </div>

      </Row>
    </Container>
  )
}
export default Topbar;