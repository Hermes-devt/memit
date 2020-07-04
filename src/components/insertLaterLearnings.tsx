import React, {useState} from 'react';
import {tLaterType} from '../types';
import InsertLaterLearningsPopup from './insertLaterLearningsPopup';
import NumericInput from './numericInput';
import {save} from '../js/storageHandling';
import {useSelector, useDispatch} from 'react-redux';
import {UserData} from '../types';
import storage, {} from '../store/data/action';

interface Props{
  data: UserData;
  setData(nData: UserData): void;
}

export function InsertLaterLearnings(props: Props){
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const [popup, setPopup] = useState<any>( { display: false, indexClicked: 0, })
  const dispatch = useDispatch();

  if( Data.laterLearnings.list.length === 0) return <span></span>

  return(
    <span style={container}>
      <span style={{fontWeight:'bold'}}> Insert: </span>
      {Data.laterLearnings.list.map( (item: tLaterType, index:number)=>{

        return(
          <span
            key={index} 
            style={insertion}
            onClick={ ()=>{ 
              setPopup( {display: true, indexClicked: index});
            }}
          >
            <span
            
            >{item.name}</span>
            <NumericInput 
              placeholder={"0"}
              value={ item.questionsFetch}
              stopPropagation={true}
              style={{width: 25, color: 'black', backgroundColor: 'white', textAlign: 'center', border: '1px solid silver', marginLeft: 5}}
              onChange={(nr: number)=>{
                let nData: UserData = {...Data};
                nData.laterLearnings.list[index].questionsFetch = nr;
                dispatch( storage.setData(nData));
                save(nData);
              }}
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

    </span>
  )
}


export default InsertLaterLearnings;
const container = {
  fontSize: 10,
  verticalAlign: 'top',
  paddingLeft: '10px',
  height: '25px',

}

const insertion = {
  display: 'inline-block',
  padding: '2px 10px',
  border: '1px solid silver',
  borderRadius: 5,
  cursor: 'pointer',
}