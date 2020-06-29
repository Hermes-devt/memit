import React, {CSSProperties, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {UserData} from '../types';

interface Props{
  questions: string;
  answers: string;
  insert(questions: string, answers: string): void;
  questionsToFetch: number;
  cancel(): void;
}

export function InsertLaterLearningsPopup(props: Props){
  const [questions, setQuestions] = useState<string>("")
  const [answers, setAnswers] = useState<string>("")

  useEffect( ()=>{
    let {questions, answers} = props;

    console.log('questions', questions)
    console.log('answer', answers);
    //get number of total questions in field
    const re = /\r\n|\r|\n\s*\d\./g;
    const totalNumberOfQuestions:number = ((questions || '').match(re) || []).length;

    // check if textarea has enough question otherwise just grab all of them. 
    let getQuestions:number = totalNumberOfQuestions  <= props.questionsToFetch  ?
      totalNumberOfQuestions  : props.questionsToFetch;

    const matches: string[] = (questions || '').match(re) || [];
    let fetchStringToThisMatch: string = matches[getQuestions];

    let cutoffIndexQuestions: number = questions.indexOf(fetchStringToThisMatch);
    let questionsToInsert: string = questions.slice( 0, cutoffIndexQuestions );

    let cutoffIndexAnswers: number = answers.indexOf(fetchStringToThisMatch);
    let answersToInsert: string = answers.slice( 0, cutoffIndexAnswers );

    setQuestions( questionsToInsert);
    setAnswers(answersToInsert);
  }, [props])

  return(
    <div style={container} onClick={ ()=>{ }} >
      <textarea readOnly style={textarea} value={questions} />
      <textarea readOnly style={textarea} value={answers} />
      <div onClick={ ()=> props.insert( questions, answers)} style={insert} >INSERT</div>
      <div onClick={ props.cancel } style={cancel}>CANCEL</div> </div>
  )
}

export default InsertLaterLearningsPopup;
const insert = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '20px 20px',
  marginLeft: -45,
  marginTop: -40,
  color: 'black',
  border: '1px solid black',
  fontSize: 15,
  borderRadius: 5,
  backgroundColor: 'lightblue',
  textAlign: 'center',
  cursor: 'pointer', 
  opacity: 0.8,
} as CSSProperties

const cancel = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '2px 22px',
  fontSize: 12,
  marginLeft: -45,
  marginTop: 30,
  color: 'white',
  border: '1px solid black',
  borderRadius: 5,
  backgroundColor: 'red',
  textAlign: 'center',
  cursor: 'pointer', 
  opacity: 0.8,
} as CSSProperties

const textarea = {
  display: 'inline-block',
  width: '50%',
  height: '100%',
  verticalAlign: 'top',
}

const container = {
  color: 'black',
  zIndex: 999,
  fontSize: 8,
  position: 'fixed',
  left: '50%',
  top: '50%',
  boxSizing: 'border-box',
  marginLeft: '-25vw',
  marginTop: '-25vh',
  width: '50vw',
  height: '50vh',
  backgroundColor: 'white',
  border: '1px solid silver',
  borderRadius: 5,

} as CSSProperties
