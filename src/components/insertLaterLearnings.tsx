import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {tLaterType} from '../types';
import InsertLaterLearningsPopup from './insertLaterLearningsPopup';
import {useSelector, useDispatch} from 'react-redux';
import {UserData} from '../types';
import storage, { setData } from '../store/data/action';

interface Props{
  data: UserData;
  setData(nData: UserData): void;
}

export function InsertLaterLearnings(props: Props){
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const [popup, setPopup] = useState<any>( { display: false, indexClicked: 0, })
  const dispatch = useDispatch();


  return(
    <Container fluid style={container}>
      <span> Insert new data: </span>
      {Data.laterLearnings.list.map( (item: tLaterType, index:number)=>{
        return(
          <span 
            key={index} 
            style={insertion}
            onClick={ ()=>{ 
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

      {popup.display && 
        <InsertLaterLearningsPopup 
          questions={ Data.laterLearnings.list[popup.indexClicked].questions} 
          answers={ Data.laterLearnings.list[popup.indexClicked].answers} 
          cancel={ ()=>{ setPopup({display: false, indexClicked: 0})}}

          insert={ (questions, answers)=>{
            if( Data.list.length <= 0) return;
            let nData = {...Data};
            nData.list[ nData.list.length - 1 ].questions += '\n' + questions;
            nData.list[ nData.list.length - 1 ].answers += '\n' + answers;

            let questionsLeftover = nData.laterLearnings.list[ popup.indexClicked].questions.substring( questions.length );
            let answersLeftover = nData.laterLearnings.list[ popup.indexClicked].answers.substring( answers.length );
            nData.laterLearnings.list[ popup.indexClicked].questions = questionsLeftover;
            nData.laterLearnings.list[ popup.indexClicked].answers = answersLeftover;

            setPopup({display: false, indexClicked: 0});
            props.setData( nData );
            dispatch( storage.setData(nData) );
          }}

          questionsToFetch={ Data.laterLearnings.list[popup.indexClicked].questionsFetch}
      /> }

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