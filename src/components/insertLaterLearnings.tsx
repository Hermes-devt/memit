import React, {useState, CSSProperties} from 'react';
import {tLaterType} from '../types';
import InsertLaterLearningsPopup from './insertLaterLearningsPopup';
import NumericInput from './numericInput';
import {save} from '../js/storageHandling';
import {useSelector, useDispatch} from 'react-redux';
import {UserData} from '../types';
import storage, {} from '../store/data/action';
import '../CSS/insertLaterLearnings.scss';

interface Props{
  data: UserData;
  setData(nData: UserData): void;
}

export function InsertLaterLearnings(props: Props){
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );

  const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [popup, setPopup] = useState<any>( { display: false, indexClicked: 0, })
  const dispatch = useDispatch();

  if( Data.laterLearnings.list.length === 0) return <span></span>

  return(
    <span style={container} id="insertLaterLearnings">

      <span onClick={ ()=>{ 
        // setDisplayDropdown(true) 
        ;
      }}> <span className="opener">Later learnings</span>
        
        {displayDropdown && <div 
          style={insertion}>
          {Data.laterLearnings.list.map( (item: tLaterType, index:number)=>{
            return(
              <div
                key={index} 
                style={items}
                onMouseOver={ (evt)=>{ evt.currentTarget.style.backgroundColor = 'silver'; evt.currentTarget.style.color  = 'black'; }}
                onMouseOut={ (evt)=>{ evt.currentTarget.style.backgroundColor = 'black'; evt.currentTarget.style.color  = 'silver'; }}
                onClick={ (evt)=>{ 
                  evt.stopPropagation();
                  setPopup( {display: true, indexClicked: index});
                  setDisplayDropdown(false);
                }}
              > <span style={{display: 'inline-block', width: 120}}>{item.name}</span>
                <NumericInput 
                  placeholder={"0"}
                  value={ item.questionsFetch}
                  stopPropagation={true}
                  style={{ display: 'inline-block', width: 25, color: 'black', backgroundColor: 'white', textAlign: 'center', border: '1px solid silver', marginLeft: 5}}
                  onChange={(nr: number)=>{
                    let nData: UserData = {...Data};
                    nData.laterLearnings.list[index].questionsFetch = nr;
                    dispatch( storage.setData(nData));
                    save(nData);
                  }}
                />
              </div>
            )
          })} 
        </div>}
      </span>

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
  display: 'inline-block',
  fontSize: 10,
  verticalAlign: 'top',
  paddingLeft: '10px',
  height: '25px',
  position: 'relative',
  zIndex: 9,
} as CSSProperties

const insertion = {
  display: 'block',
  position: 'absolute',
  top: '23px', 
  left: 0,
  width: '190px',
  verticalAlign: 'bottom',
  padding: '5px 10px',
  border: '1px solid silver',
  borderRadius: 5,
  cursor: 'pointer',
  backgroundColor: 'black',
} as CSSProperties;

const items = {
  color: 'silver',
  padding: '5px 0px',
  borderBottom: '1px solid silver',
  paddingLeft: '10px',
}