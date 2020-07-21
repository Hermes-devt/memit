import React, {CSSProperties, useEffect, useState} from 'react';

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
    let {questions, answers}: {questions:string, answers:string} = props;
    const re = /\r\n|\r|\n\s*\d\./g;

    function grabAtomizedPieces(dataString: string){
      let totalNumberOfQuestions:number = ((dataString || '').match(re) || []).length;
      let matches: string[] = (dataString || '').match(re) || [];
      if( dataString.length > 2 && dataString.substring(0, 2).match(/\d\./)){
        totalNumberOfQuestions += 1; 
        matches.unshift( dataString.substring(0, 2));
      }
      if( totalNumberOfQuestions <= Number(props.questionsToFetch)){ return dataString }
      let fetchStringToThisMatch: string = matches[props.questionsToFetch];
      let cutoffIndexAnswers: number = dataString.indexOf(fetchStringToThisMatch);
      let answersToInsert: string = dataString.slice( 0, cutoffIndexAnswers );

      return answersToInsert;
    }
    const questionString = grabAtomizedPieces(questions);
    const answersString = grabAtomizedPieces(answers);

    setQuestions( questionString );
    setAnswers( answersString);
  }, [props])

  useEffect( ()=>{
    const onPress = (evt:any)=>{
      switch( evt.key ){
        case 'Enter': props.insert(questions, answers); break;
        case 'Escape': props.cancel(); break;
        default: break;
      }
    }

    document.addEventListener('keydown', onPress, true);
    return( ()=>{ document.removeEventListener( 'keydown', onPress, true); })
  },[questions, answers]) //eslint-disable-line



  const MobileInterface = ()=>{
    return(
      <div style={containerMobile} onClick={ ()=>{ }} >
        <textarea readOnly style={textarea} value={questions} />
        <textarea readOnly style={textarea} value={answers} />
        <div onClick={ ()=> props.insert( questions, answers)} style={insert} >INSERT</div>
        <div onClick={ props.cancel } style={cancel}>CANCEL</div> </div>
    )
  }

  const DesktopInterface = ()=>{
    return(
      <div style={container} onClick={ ()=>{ }} >
        <textarea readOnly style={textarea} value={questions} />
        <textarea readOnly style={textarea} value={answers} />
        <div onClick={ ()=> props.insert( questions, answers)} style={insert} >INSERT</div>
        <div onClick={ props.cancel } style={cancel}>CANCEL</div> </div>
    )
  }

  const mobile = window.innerWidth <= 700 ? true : false;
  if( mobile ) return MobileInterface();
  else return DesktopInterface();
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


const containerMobile = {
  color: 'black',
  zIndex: 999,
  fontSize: 8,
  position: 'fixed',
  left: '50%',
  top: '50%',
  boxSizing: 'border-box',
  marginLeft: '-48vw',
  marginTop: '-40vh',
  width: '96vw',
  height: '80vh',
  backgroundColor: 'white',
  border: '1px solid silver',
  borderRadius: 5,
} as CSSProperties
