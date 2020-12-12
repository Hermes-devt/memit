import React from 'react';
// import TextAreas1 from './textAreas1';
// import TextArea from './TextArea';
// import ExplodeArea from './explodeArea';
// import ExplodeAreaMobile from './explodeAreaMobile';
import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
// import UserInput from './userInput';
import {iUserData} from '../../templatesTypes';
import {useSelector} from 'react-redux';


import splitAwayQuestionAndAnswers from '../../js/textManipulation/splitAwayQuestionAndAnswers';
import {useDispatch} from 'react-redux';
import storage from '../../store/data/action'
import deleteQuestions from '../../js/textManipulation/execute/deleteQuestions';
import adjustNumbers from '../../js/textManipulation/adjustNumbers';
import {save} from '../../js/storageHandling';

// import ExplodeQuestions from './explodeQuestions';
import '../../CSS/interfaceOptions.scss';

interface Props {
  layout: number,
  activeNote: number,
  // forceUpdate?: any;
  forceIt?: any,
  forceUpdate: any,
}

// export function InterfaceOptions({layout, activeNote}: Props){
export function InterfaceOptions2(props: Props){
  // const [activeNote, setActiveNote] = useState(0);
  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  // const [activeQuestions, setActiveQuestions] = useState<number[]>([1]);
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [nrOfQuestions, setNrOfQuestions] = useState<number>(0);
  const [questionAnswerSplit, setQuestionsAnswersSplit] = useState<{questions: string[], answers:string[]}>({questions: [], answers: []})


  const [explodeView, setExplodeView] = useState<boolean>(true);
  const [mouseOverQuestion_index, setMouseOverQuestion_index] = useState<number>(0)
  // const [textAreaActive, setTextareaActive] = useState<any>({active:false, index: 0});
  const [shiftDown, setShiftDown] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect( ()=>{
    // console.log( props.data.list[props.activeNote]);
    let split = splitAwayQuestionAndAnswers( data.list[props.activeNote])
    setQuestionsAnswersSplit( split );

    setNrOfQuestions( split.questions.length - 2);
  },[props])//eslint-disable-line

  useEffect( ()=>{
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return ()=>{ 
      document.removeEventListener('keydown', handleKeyDown); 
      document.removeEventListener('keyup', handleKeyUp ); 
    }

  },[props, data, activeQuestion, questionAnswerSplit]); //eslint-disable-line

  const handleKeyUp = (evt:any)=>{ if( evt.key === 'Shift'){ setShiftDown(false); }}

  const handleKeyDown = (evt:any)=>{
    let keyPressed = evt.key;
    // const len:number = explodedElements.length;

    if( !explodeView && keyPressed === 'Escape'){
      data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
      setExplodeView( true )
      dispatch(storage.setData( data ))
      return;
    }

    if( keyPressed === 'Shift'){
      setShiftDown(true);
      return;
    }

    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') 
      return;

    if( keyPressed === "ArrowLeft" || keyPressed ==='ArrowRight') 
      evt.preventDefault();


    switch( keyPressed ){
      // case 'E': setExplodeView( false ); break;
      // case 'Shift': setShiftDown(true); break;
      case 'j': case 'ArrowRight': moveRight(); break;
      case 'k': case 'ArrowLeft': moveLeft(); break;
      case 'x': deleteQuestion(); break;
      case 'a': addNewQuestion(); break;
      case 'Escape': 
        // setTextareaActive({active: false, index: activeQuestion}); 
        // setActiveQuestions( [activeQuestions[0]] || [0] );
        break;
      case 'Enter': case 'e':
        // setTextareaActive({active: true, index: activeQuestion}); 
        break;
      case 'K': //Shift question one step upwards
        // let arr = [...activeQuestions].sort();
        let arr = [activeQuestion];
        let q = splitAwayQuestionAndAnswers( data.list[props.activeNote])

        for( let i=0; i<arr.length; i++){
          let tempActiveQuestion=arr[i];
          if( tempActiveQuestion < 2 || arr[i-1] === arr[i]-1)
            continue;

          arr[i] -= 1;
          let insertPos = tempActiveQuestion - 1;
          q.questions.splice( insertPos, 0, '' + q.questions[ tempActiveQuestion ].trim() + '\n' );
          q.answers.splice( insertPos, 0, '' + q.answers[ tempActiveQuestion ].trim() + '\n');
          q.questions.splice( tempActiveQuestion + 1, 1);
          q.answers.splice( tempActiveQuestion + 1, 1);
        }
        let questions: string  = q.questions.join('').trim() || '';
        let answers: string = q.answers.join('').trim() || '';

        // console.log( questions );
        data.list[props.activeNote].questions = questions;
        data.list[props.activeNote].answers = answers;
        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
        dispatch(storage.setData( data ))
        save( data );

        let split = splitAwayQuestionAndAnswers( data.list[props.activeNote])
        setQuestionsAnswersSplit( split );

        setActiveQuestion( arr[0]);
      break;
      case 'J': //shift question one step uwpards

        let arr1 = [activeQuestion];
        // let arr1 = [...activeQuestions].sort().reverse();
        let q2 = splitAwayQuestionAndAnswers( data.list[props.activeNote])

        for( let i=0; i<arr1.length; i++){
          let insertPosition= arr1[i];
          if( insertPosition >= q2.questions.length - 2) continue;
          if( Number(arr1[i-1]) === Number(arr1[i]+1) ) continue;

          arr1[i] += 1;
          let insertPos2 = insertPosition + 2;
          if( insertPosition >= q2.questions.length - 3 ){
            q2.questions.push( q2.questions[ insertPosition ].trim() + '\n' )
            q2.answers.push( q2.answers[ insertPosition ].trim() + '\n' )
            q2.questions.splice( insertPosition, 1);
            q2.answers.splice( insertPosition, 1);
          }else{
            q2.questions.splice( insertPos2, 0, '' + q2.questions[ insertPosition ].trim() + '\n' );
            q2.answers.splice( insertPos2, 0,  '' + q2.answers[ insertPosition ].trim()  + '\n' );
            q2.questions.splice( insertPosition, 1);
            q2.answers.splice( insertPosition, 1);
          }
        }
        let questions2: string  = q2.questions.join('').trim() || '';
        let answers2: string = q2.answers.join('').trim() || '';

        data.list[props.activeNote].questions = questions2;
        data.list[props.activeNote].answers = answers2;
        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
        dispatch(storage.setData( data ))
        // setActiveQuestions( arr1 );
        save( data );

        let split2 = splitAwayQuestionAndAnswers( data.list[props.activeNote])
        setQuestionsAnswersSplit( split2 );

        setActiveQuestion( arr1[0]);
        break;
    }

  };

  const moveLeft = ()=>{
      let tempActiveQuestion = activeQuestion <= 1 ? 1 : activeQuestion - 1;
      setActiveQuestion(tempActiveQuestion);
  }

  const moveRight = ()=>{
    let nrOfQuestion = splitAwayQuestionAndAnswers( data.list[props.activeNote]).questions;
    if( activeQuestion >= nrOfQuestion.length - 2) return;
      setActiveQuestion(activeQuestion=> activeQuestion+1 );

  }

  const deleteQuestion = ()=>{
    let nrOfQuestion2 = splitAwayQuestionAndAnswers( data.list[props.activeNote]).questions;
    if( nrOfQuestion2.length <=2 ) return;


    data.list[props.activeNote] = deleteQuestions( data.list[props.activeNote], [JSON.stringify(activeQuestion) ] );
    data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
    let nActiveQuestion:number = activeQuestion >= nrOfQuestion2.length -2 ? activeQuestion-1 : activeQuestion;
    nActiveQuestion = nActiveQuestion < 0 ? 0 : nActiveQuestion;
    setActiveQuestion( nActiveQuestion ); 

    let split = splitAwayQuestionAndAnswers( data.list[props.activeNote])
    setQuestionsAnswersSplit( split );

    dispatch( storage.setData({...data}) );
    save( data );
  }

  const addNewQuestion = ()=>{
    let daily = data.list[props.activeNote];
    let tx = splitAwayQuestionAndAnswers( daily);
    let current = activeQuestion;
    let index = current;

    let insertValue = "" + (Number(current)+2) + ". ";
    if( index >= tx.questions.length - 2){
      tx.questions[tx.questions.length-1].trim();
      tx.answers[tx.answers.length-1].trim();
      tx.questions.push(insertValue)
      tx.answers.push(insertValue);
    }else{
      tx.questions.splice(index+1, 0, insertValue  + "\n")
      tx.answers.splice(index+1, 0,  insertValue + "\n")
    }

    data.list[props.activeNote].questions = tx.questions.join('');
    data.list[props.activeNote].answers = tx.answers.join('');
    data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);

    let split = splitAwayQuestionAndAnswers( data.list[props.activeNote])
    setQuestionsAnswersSplit( split );
    setActiveQuestion( activeQuestion=>activeQuestion+1);

    dispatch( storage.setData(data) );
    save( data );
    setMouseOverQuestion_index( mouseOverQuestion_index+1);
  }

  const questionWithoutTheNumber = (str: any = ""): string=>{
    let re = /^\d+\./
    return str.replace( re, '');
  }

  const setAreaIfNoQuestions = ()=>{ 
    return( 
      <div id="">
        <textarea placeholder='Question' className="blockArea" autoFocus/>
        {/* <textarea placeholder='Answer' className="blockArea" / > */}
      </div>
    ) 
  }

  const setQuestionBox = ()=>{

    let answer:string = questionWithoutTheNumber( questionAnswerSplit.questions[ activeQuestion ] || "" );


    if( !questionAnswerSplit.questions[ activeQuestion ] || questionAnswerSplit.questions[ activeQuestion ].length === 0){
      return( <textarea cols={4} placeholder='Question is currently empty' className="blockArea1" style={{height: '100%', width: '100%'}} />)
    }

    return(
        <div >
          <div id="top" >
            <div className="rotatingElement" style={{height: '15px', fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
            >{ activeQuestion > 3 ? questionAnswerSplit.questions[activeQuestion-3] : "" }</div>

            <div className="rotatingElement" style={{height: '15px', fontSize: '13px', lineHeight: '13px', opacity: 0.2, top: ''}}
            >{ activeQuestion > 2 ? questionAnswerSplit.questions[activeQuestion-2] : "" }</div>

            <div className="rotatingElement" style={{height: '', fontSize: '17px', lineHeight: '20px', opacity: 0.3, top: '50px'}}
            >{(activeQuestion > 1) ? questionAnswerSplit.questions[activeQuestion-1] : ""}</div>
          </div>

          { answer.length <= 2 && <span>
              <span className="textToBlockArea1">{activeQuestion}.</span>
              <textarea cols={4} placeholder='Question is currently empty' className="blockArea1" / > 
              </span>}
          { answer.length > 2 && 
              <div className="rotatingElement activeQuestion">{questionWithoutTheNumber(questionAnswerSplit.questions[activeQuestion])}</div>
          }

          <div id='bottom'>
            <div className="rotatingElement" style={{fontSize: '17px', lineHeight: '20px', opacity: 0.3, top: ''}}
            >{(activeQuestion + 0< nrOfQuestions) ? questionAnswerSplit.questions[activeQuestion+1] : ""}</div>

            <div className="rotatingElement" style={{fontSize: '13px', lineHeight: '10px', opacity: 0.2, top: ''}}
            >{ activeQuestion + 1 < nrOfQuestions ? questionAnswerSplit.questions[activeQuestion+2] : '' }</div>

            <div className="rotatingElement" style={{fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
            >{ activeQuestion + 2< nrOfQuestions ? questionAnswerSplit.questions[activeQuestion+3] : "" }</div>

            <div className="rotatingElement" style={{fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
            >{ activeQuestion + 3 < nrOfQuestions ? questionAnswerSplit.questions[activeQuestion+4] : "" }</div>
        </div>
      </div>)
  }


  const setAnswerBox= ()=>{
    // let str = questionAnswerSplit.answers[ activeQuestion ] || "";
    let answer:string = questionWithoutTheNumber( questionAnswerSplit.answers[ activeQuestion ] || "" );

    if( answer.length <= 2){
      return( <textarea placeholder='Answer' className="blockArea" / >)
    }else{
      if( shiftDown )
        return( <span id="answerBoxText">{answer}</span>)
      else{
        return <span id="answerBoxText"></span>
      }
    }
  }

  return(
    <div style={{backgroundColor: '', height: '100%', overflow: 'auto', overflowX: "hidden"}}>
    <Container id='mobile' className="noselect">

      {/* { (questionAnswerSplit.questions.length <= 2) && <span>{setAreaIfNoQuestions()}</span> } */}

      { (questionAnswerSplit.questions.length > 2) && <span>
          <div className='clickArea left' onClick={ ()=>{ moveLeft(); }}></div>
          <div className='clickArea right' onClick={ ()=>{ moveRight(); }} ></div>
      </span> }

      <div id="questionBox" className="box"> {setQuestionBox()} </div>
      <div id="answerBox" className='box'> { setAnswerBox() } </div>

      <div id="commandContainer">
        <span className="icon deleteQuestion" onClick={ ()=>{ deleteQuestion(); }}>X</span>
        <span className="icon" onClick={ ()=>{ console.log('edit question')}} >e</span> 
        <span className="icon addNewQuestion" onClick={ ()=>{ addNewQuestion(); }} >+</span>
      </div>

      <div id="counter">
        <span>{activeQuestion}</span>
        <span> / </span>
        <span>{nrOfQuestions}</span>
      </div>
    </Container>
    </div>
  )
}
 
export default InterfaceOptions2;