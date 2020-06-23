import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {tLaterType} from '../types';
import InsertLaterLearningsPopup from './insertLaterLearningsPopup';

export function InsertLaterLearnings(props:any){
  // const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [pressed, setPressed] = useState<number>(-1);
  const [popup, setPopup] = useState<any>( { display: false, indexClicked: 0, })
  const [list, setList] = useState<any>( props.data.laterLearnings.list)

  useEffect( ()=>{
    console.log( 'data in insertlaterlearnings', props.data.laterLearnings.list );
    console.log( list );
  },[] );

  useEffect( ()=>{
  }, [props]);

  return(
    <Container fluid style={container}>
      <span>
        Insert new data: 
      </span>
      { props.data.laterLearnings.list.map( (item: tLaterType, index:number)=>{
        return(
          <span 
            key={index} 
            style={insertion}
            onClick={ ()=>{ 
              // setDisplayPopup(true);
              setPopup( {display: true, indexClicked: index});
            }}
          >
            <span>{item.name}</span>
            <input 
              style={{width: 25, color: 'black', backgroundColor: 'white', textAlign: 'center', fontWeight: 'bold', marginLeft: 5}}
              value={item.questionsFetch}
              placeholder='0'
              onChange={ ()=>{;}}
            />
          </span>
        )
      })}

      {popup.display && <InsertLaterLearningsPopup questions={ list[popup.indexClicked].questions} answers={list[popup.indexClicked].answers} /> }

    </Container>
  )
}


export default InsertLaterLearnings;
const container = {
  fontSize: 10,
  backgroundColor: 'black',
  color: 'white',
}

const insertion = {
  display: 'inline-block',
  padding: '2px 10px',
  border: '1px solid silver',
  borderRadius: 5,
  cursor: 'pointer',
  marginLeft: 10,
}