import React from 'react';
// import TextAreas1 from './textAreas1';
import TextArea from './TextArea';
import ExplodeArea from './explodeArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import UserInput from './userInput';
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
export function InterfaceDesktop(props: Props){
  // const [activeNote, setActiveNote] = useState(0);
  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  const [activeQuestions, setActiveQuestions] = useState<number[]>([1]);

  const [questionMarked, setMarkedQuestion] = useState<number[]>([]);
  const [explodeView, setExplodeView] = useState<boolean>(true);

  const [mouseOverQuestion_index, setMouseOverQuestion_index] = useState<number>(0)
  const [textAreaActive, setTextareaActive] = useState<any>({active:false, index: 0});
  const [shiftDown, setShiftDown] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect( ()=>{
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return ()=>{ 
      document.removeEventListener('keydown', handleKeyDown); 
      document.removeEventListener('keyup', handleKeyUp ); 
    }

  },[props, activeQuestions, explodeView, data, questionMarked, shiftDown]);//eslint-disable-line


  useEffect( ()=>{
    if( data.list.length-1 === props.activeNote){
      setExplodeView(false); return;
    }

    let nrOfQuestion2 = splitAwayQuestionAndAnswers( data.list[props.activeNote]).questions;
    if( nrOfQuestion2.length <= 2)
      setExplodeView( false );
    else
      setExplodeView( true );
  },[props.activeNote]) //eslint-disable-line


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
    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;

    if( keyPressed === "ArrowDown" || keyPressed ==='ArrowUp') 
      evt.preventDefault();

    let activeQuestion:number = activeQuestions[0] || 0;

    switch( keyPressed ){
      // case 'Shift': setShiftDown(true); break;
      case 'E': setExplodeView( false ); break;
      case 'j': case 'ArrowDown':
        let nrOfQuestion = splitAwayQuestionAndAnswers( data.list[props.activeNote]).questions;
        if( activeQuestion >= nrOfQuestion.length - 2) return;
         activeQuestion= activeQuestion + 1;
         setActiveQuestions([activeQuestion]);
         break;
      case 'k': case 'ArrowUp':
        activeQuestion = activeQuestion <= 1 ? 1 : activeQuestion - 1;
        setActiveQuestions([activeQuestion]);
        break;
      case 'm': 
        let marked = new Set([...questionMarked]);
        activeQuestions.forEach( (value:number)=>{
          marked.has(value) ? marked.delete(value) : marked.add(value);
          // if( marked.has(value)){
          //   marked.delete(value);
          // }else{
          //   marked.add(value)
          // }
        })
        setMarkedQuestion( Array.from(marked)); 

        break;
      case 'x': deleteQuestion(); break;
      case 'a': 
        addNewQuestion( activeQuestion );
        setActiveQuestions( [activeQuestions[0] + 1]);
        break;
      case 'Escape': 
        setTextareaActive({active: false, index: activeQuestion}); 
        setActiveQuestions( [activeQuestions[0]] || [0] );
        if( shiftDown ){
          console.log('shift is still down?', shiftDown)
          setMarkedQuestion([]);
        }
        break;
      case 'Enter': case 'e':
        setTextareaActive({active: true, index: activeQuestion}); 
        break;
      case 'K': //Shift question one step upwards
        let arr = [...activeQuestions].sort();
        let q = splitAwayQuestionAndAnswers( data.list[props.activeNote])

        for( let i=0; i<arr.length; i++){
          activeQuestion=arr[i];
          if( activeQuestion < 2 || arr[i-1] === arr[i]-1)
            continue;

          arr[i] -= 1;
          let insertPos = activeQuestion - 1;
          q.questions.splice( insertPos, 0, '' + q.questions[ activeQuestion ].trim() + '\n' );
          q.answers.splice( insertPos, 0, '' + q.answers[ activeQuestion ].trim() + '\n');
          q.questions.splice( activeQuestion + 1, 1);
          q.answers.splice( activeQuestion + 1, 1);
        }
        let questions: string  = q.questions.join('').trim() || '';
        let answers: string = q.answers.join('').trim() || '';

        // console.log( questions );
        data.list[props.activeNote].questions = questions;
        data.list[props.activeNote].answers = answers;
        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
        dispatch(storage.setData( data ))
        setActiveQuestions( arr );
        save( data );
      break;
      case 'J': //shift question one step uwpards

        let arr1 = [...activeQuestions].sort().reverse();
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
        setActiveQuestions( arr1 );
        save( data );
        break;
    }

  };


  const explodeAreaToParent = (command:string, index:any)=>{
    // console.log('here', command, index)
    switch(command){
      case 'mouseOver': setMouseOverQuestion_index(index); break;
      case 'addNewQuestion': addNewQuestion(index); break;
      case 'deleteQuestion': deleteQuestion(index); break;
      case 'activeElements': setActiveQuestions( index ); break;
      case 'editQuestion': setTextareaActive(index); break;
    }
  }

  const deleteQuestion = (questionToDelete?: number)=>{
    let nrOfQuestion2 = splitAwayQuestionAndAnswers( data.list[props.activeNote]).questions;
    if( nrOfQuestion2.length <=2 ) return;

    let activeQuestion:number = activeQuestions[0] || 0;
    let temptemp: number[] = questionToDelete ? [questionToDelete] : activeQuestions;

    data.list[props.activeNote] = deleteQuestions( data.list[props.activeNote], temptemp.map( (value: number)=> JSON.stringify(value)) );
    data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
    let nActiveQuestion = activeQuestion >= nrOfQuestion2.length -2 ? activeQuestions[0]-1 : activeQuestions[0];
    nActiveQuestion = nActiveQuestion < 0 ? 0 : nActiveQuestion;
    setActiveQuestions([nActiveQuestion]);
    // setActiveQuestions([...[activeQuestions[0]]]);
    if( nrOfQuestion2.length - 1 <= 2)
      setExplodeView(false);

    dispatch( storage.setData(data) );
    save( data );

  }

  const addNewQuestion = (index:number)=>{
    let daily = data.list[props.activeNote];
    let tx = splitAwayQuestionAndAnswers( daily);

    let insertValue = "" + (Number(index)+2) + ". ";
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
    dispatch( storage.setData(data) );
    save( data );
    setMouseOverQuestion_index( mouseOverQuestion_index+1);
  }

  return (
    <span id="interfaceContainer">
      <Container fluid className="px-0 mx-0">
        <Row className="no-gutters">
          <Col>
            <div
              className={
                props.layout === 2 ? "textareaPartialSize" : "textareaFullSize"
              }
            >
              {!explodeView &&
                <TextArea
                  data={{
                    activeNote: props.activeNote,
                    placeholder: "Type your questions here",
                    name: "questions",
                  }}
                />
              }

              { (explodeView && data.list[props.activeNote].answers.length < 5) &&
                <Row> <div 
                  onClick={ ()=>{ 
                    for(let i=0; i<7; i++){ 
                      addNewQuestion(-1)
                    } 
                    setExplodeView(true);
                }}
                  id="noQuestions"
                  >add question + </div>
                </Row>
              }

              { (explodeView && data.list[props.activeNote].answers.length >= 5) &&
              // {explodeView && (
                <ExplodeArea
                  activeQuestions={activeQuestions}
                  mouseOverQuestion={mouseOverQuestion_index}
                  toParent={explodeAreaToParent}
                  shiftDown={shiftDown}
                  questionMarked={questionMarked}
                  textAreaActive={textAreaActive}
                  
                  questionsOrAnswersData={data.list[props.activeNote].questions}
                />
              }
            </div>

            {props.layout === 2 && (
              <div className="textareaUserInput_middleColumn">
                <UserInput
                  forceUpdate={props.forceUpdate}
                  data={{
                    activeNote: props.activeNote,
                    placeholder: "User input",
                    // tabIndex: -1,
                    name: "userInput",
                  }}
                />
              </div>
            )}
          </Col>

          {props.layout === 1 && (
            <Col>
              <div className="textareaFullSize">
                <UserInput
                  forceUpdate={props.forceUpdate}
                  data={{
                    activeNote: props.activeNote,
                    placeholder: "User input",
                    // tabIndex: -1,
                    name: "userInput",
                  }}
                />
              </div>
            </Col>
          )}

          {props.layout !== 4 && (
            <Col className="">
              <div className="textareaFullSize">
                {!explodeView && (
                  <TextArea
                    data={{
                      activeNote: props.activeNote,
                      placeholder: "Answers",
                      name: "answers",
                    }}
                  />
                )}
                {explodeView && (
                  <ExplodeArea
                    activeQuestions={activeQuestions}
                    mouseOverQuestion={mouseOverQuestion_index}
                    questionMarked={questionMarked}
                    toParent={explodeAreaToParent}
                    shiftDown={shiftDown}
                    textAreaActive={textAreaActive}
                    questionsOrAnswersData={data.list[props.activeNote].answers}
                  />
                )}
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </span>
  );

  // return ( <span id="interfaceContainer">
  //   {layout === 6 && <ExplodeQuestions forceUpdate={props.forceIt} activeNote={activeNote} /> }
  // </span>);


}
 
export default InterfaceDesktop;