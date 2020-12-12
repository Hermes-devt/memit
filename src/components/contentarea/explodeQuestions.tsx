import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
// import {save} from '../../js/storageHandling';
import splitAwayQuestionAndAnswers from '../../js/textManipulation/splitAwayQuestionAndAnswers';
import {iUserData} from '../../templatesTypes';
import {Container, Row, Col} from 'react-bootstrap';

import {useDispatch} from 'react-redux';
import storage from '../../store/data/action'

import deleteQuestions from '../../js/textManipulation/execute/deleteQuestions';
import adjustNumbers from '../../js/textManipulation/adjustNumbers';
import '../../CSS/_explodeQuestions.scss';


interface Props{
  activeNote: number;
  forceUpdate:any;
}

export function ExplodeQuestions(props:Props){
  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  const [questionsAnswers, setQuestionsAnswers] = useState<{questions: string[], answers: string[]}>({questions:[], answers: []});

  const [multipleHighlights, setMultipleHighlights] = useState<number[]>([1]);

  const [highlightedQuestion, setHighlightedQuestion] = useState<number>(1);
  const [textAreaActive,setTextareaActive] = useState<any>({active:false, index: 0});
  const [shiftDown, setShiftDown] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect( ()=>{ setQuestions( data ); }, [props.activeNote]); //eslint-disable-line

  useEffect( ()=>{
    // document.addEventListener("keydown", handleKeyDown);
    // document.addEventListener('keyup', handleKeyUp);

    // return ()=>{ 
    //   document.removeEventListener('keydown', handleKeyDown); 
    //   document.removeEventListener('keyup', handleKeyUp ); 
    // }


  },[questionsAnswers, multipleHighlights, textAreaActive, props.activeNote]);

  const handleKeyUp = (evt:any)=>{ if( evt.key === 'Shift'){ setShiftDown(false); }}

  const saveChanges = (temp: any)=>{

    let questions: string  = temp.questions.join('').trim() || '';
    let answers: string = temp.answers.join('').trim() || '';
    // let nData = {...data};

    data.list[props.activeNote].questions = questions;
    data.list[props.activeNote].answers = answers;
    data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
    setQuestionsAnswers( temp );
    dispatch(storage.setData(data ))
    setQuestions( data );
  };

  const handleKeyDown = (evt:any)=>{
    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;
    let keyPressed = evt.key;
    const len:number = questionsAnswers.questions.length;

    if( keyPressed === "ArrowDown" || keyPressed ==='ArrowUp') 
      evt.preventDefault();

    let activeQuestion:number = multipleHighlights[0] || 0;

    switch( keyPressed ){
      case 'Shift': setShiftDown(true); break;
      case 'j': case 'ArrowDown':
         activeQuestion= activeQuestion >= (len-1) ? len-1 :  activeQuestion + 1;
         setMultipleHighlights([activeQuestion] );
         break;
      case 'k': case 'ArrowUp':
        activeQuestion = activeQuestion <= 1 ? 1 : activeQuestion - 1;
        setMultipleHighlights([activeQuestion]);
        break;
      case 'x':
        let splitOut = multipleHighlights;
        let questionToDeleteStrArray = splitOut.map( (value: number)=> JSON.stringify(value));
        setMultipleHighlights([]);
        data.list[props.activeNote] = deleteQuestions( data.list[props.activeNote], questionToDeleteStrArray );
        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
        dispatch( storage.setData(data) );
        setQuestions( data );
        activeQuestion =  activeQuestion >= (len-1) ? len-2 : activeQuestion;
        setMultipleHighlights([activeQuestion]);
        break;
      case 'a': 
        addNewQuestion( activeQuestion );
        break;
      case 'Escape': 
        setTextareaActive({active: false, index: activeQuestion}); 
        setMultipleHighlights( [multipleHighlights[0]] || [0]);
        break;
      case 'Enter': case 'e':
        setTextareaActive({active: true, index: activeQuestion}); 
        break;
      case 'K': //Shift question one step upwards
        let arr = [...multipleHighlights].sort();
        let q = {...questionsAnswers};

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
        setMultipleHighlights(arr);
        saveChanges(q);

      break;
      case 'J': //shift question one step uwpards

        let arr1 = [...multipleHighlights].sort().reverse();
        let q2 = {...questionsAnswers};

        // console.log( 'arr1', arr1 );
        for( let i=0; i<arr1.length; i++){
          let tempActiveQuestion=arr1[i];
          if( tempActiveQuestion >= questionsAnswers.questions.length - 2) continue;
          if( Number(arr1[i-1]) === Number(arr1[i]+1) ) continue;
          // console.log('is it', questionsAnswers.questions[i+1]);
          // if( questionsAnswers.questions[i+1] === 'undefined' || (i+1)=== questionsAnswers.answers.length-1) continue;

          // console.log( 'q', questionsAnswers.questions.length-2, tempActiveQuestion)
          arr1[i] += 1;
          let insertPos2 = tempActiveQuestion + 2;
          let beforeText = questionsAnswers.questions.length-2 >= tempActiveQuestion + 1 ? '\n' : '';
          q2.questions.splice( insertPos2, 0, beforeText + q2.questions[ tempActiveQuestion ].trim() + '\n' );
          q2.answers.splice( insertPos2, 0,  beforeText + q2.answers[ tempActiveQuestion ].trim()  + '\n' );
          q2.questions.splice( tempActiveQuestion, 1);
          q2.answers.splice( tempActiveQuestion, 1);
        }
        setMultipleHighlights(arr1);
        saveChanges(q2);
        break;
    }

  };

  const setQuestions = (data: iUserData)=>{
    let daily = data.list[props.activeNote];
    const questionAnswerSplit = splitAwayQuestionAndAnswers(daily);

    //this two is generally some text at the end fo the question and answers. 
    // questionAnswerSplit.questions.pop(); questionAnswerSplit.answers.pop();

    setQuestionsAnswers( questionAnswerSplit);
  }

  const addNewQuestion = (index:number)=>{
    let daily = data.list[props.activeNote];
    let tx = splitAwayQuestionAndAnswers( daily);
    tx.questions.splice(index+1, 0, index+2 +'.')
    tx.answers.splice(index+1, 0, index+2 +'.')
    data.list[props.activeNote].questions = tx.questions.join('\n');
    data.list[props.activeNote].answers = tx.answers.join('\n');
    data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
    dispatch( storage.setData(data) );
    setQuestions( data );
  }


  const displayTextarea = (index:number)=> textAreaActive.active && textAreaActive.index === index ? {display: 'block'} : {display: "none"};
  const displayText = (index:number)=> textAreaActive.active && textAreaActive.index === index ? {display: "none"} : {display: 'block'};
  
  const onBackgroundColor = (index:number): {backgroundColor: string}=> {
    if( multipleHighlights.includes(index)) return {backgroundColor: 'orange'};
    if( index === highlightedQuestion ) return {backgroundColor: 'lightgray'};
    else return {backgroundColor: 'white'}
  }

  return(
    <Container fluid className="px-0 mx-0" id="explodeQuestions">
      { questionsAnswers.questions.length <= 2 && 
        <Row> <div 
          onClick={ ()=>{ for(let i=0; i<7; i++){ addNewQuestion(0) } }}
          id="noQuestions"
          >add question + </div>
        </Row>
      }
      <Row className='no-gutters'>
        <Col>
          <div style={{ height: '75vh', overflow: 'auto', overflowX: "hidden"}}>
            { questionsAnswers.questions.map( (question:string, index:number)=>{
              if( index <= 0) return <span key={index}></span>
              return(
                <div 
                className="questionContainer noselect" 
                style={ onBackgroundColor(index) }
                onMouseEnter={()=>{ setHighlightedQuestion( index ); }}
                key={index} >

                  <div style={ displayText(index)}
                  onClick={ ()=>{
                    if( shiftDown){
                      let nArr = new Set([...multipleHighlights]);
                      nArr.has(index) ? nArr.delete(index) : nArr.add(index);
                      let mhl = Array.from(nArr);
                      setMultipleHighlights( mhl );
                      return;
                    }
                    setMultipleHighlights([index]);
                    // setActiveQuestion(index);
                    if( textAreaActive.active ){
                      setTextareaActive({active: false, index: index}); 
                    }
                  }}
                  onDoubleClick={ ()=>{ setTextareaActive({active: true, index: index}); }}
                  >{question}
                </div>

                <textarea 
                  rows={3} 
                  style={ displayTextarea(index) }
                  className="questionArea" 
                  onChange={ (evt)=>{ 
                    let newQuestions = {...questionsAnswers};
                    newQuestions.questions[index] = evt.currentTarget.value;
                    setQuestionsAnswers( newQuestions);
                  }} 
                  // onBlur={ ()=>{ setTextareaActive({active: false, index: index}); }}
                  autoFocus
                  value={question} 
                />



                  <div className="commandContainer">
                    <span className="commandIcon deleteQuestion"
                    onClick={ ()=>{
                        data.list[props.activeNote] = deleteQuestions( data.list[props.activeNote], [JSON.stringify(index)] );
                        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
                        dispatch( storage.setData(data) );
                        setQuestions( data );
                      }}>X</span>

                    <span className="commandIcon addNewQuestion" onClick={ ()=>{ setTextareaActive({active: true, index: index}); }} >e</span> 
                    <span className="commandIcon addNewQuestion" onClick={ ()=>{ addNewQuestion(index); }} >+</span>
                  </div>

                </div>
              )
            })}
          </div>
        </Col>

        <Col>
          <div style={{ height: "75vh", overflow: 'auto', overflowX: "hidden"}}>
            { questionsAnswers.answers.map( (answers:string, index:number)=>{
              if( index === 0) return <span key={index}></span>
              // if( index <= 1) return <span key={index}></span>

              return(
                  <div  
                  key={index}
                  onMouseEnter={()=>{ setHighlightedQuestion( index ); }}
                  onClick={ ()=>{ setMultipleHighlights([index]); }}
                  onDoubleClick={ ()=>{ setTextareaActive({active: true, index: index}); }}
                  className="questionContainer noselect" 
                  style={ onBackgroundColor(index) }
                  >
                    <div style={ displayText(index)}>{answers}</div>
{/*  */}
                  <textarea 
                    rows={3} 
                    style={ displayTextarea(index) }
                    className="questionArea" 
                    onChange={ (evt)=>{ 
                      let newQuestions = {...questionsAnswers};
                      newQuestions.answers[index] = evt.currentTarget.value;
                      setQuestionsAnswers( newQuestions );
                    }} 
                    // onBlur={ ()=>{ setTextareaActive({active: false, index: index}); }}
                    value={answers} 
                  />
{/*  */}
                  </div>
              )
            })}
          </div>
        </Col>

      </Row>
    </Container>
  )
}

export default ExplodeQuestions;