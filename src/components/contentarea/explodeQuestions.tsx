import React, {useState, useEffect, CSSProperties} from 'react';
import {useSelector} from 'react-redux';
import {save} from '../../js/storageHandling';
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
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [highlightedQuestion, setHighlightedQuestion] = useState<number>(1);

  const [textAreaActive,setTextareaActive] = useState<any>({active:false, index: 0});
  const dispatch = useDispatch();


  useEffect( ()=>{
    setQuestions( data );
  }, [props.activeNote]);

  useEffect( ()=>{
    document.addEventListener("keydown", handleKeyDown);
    return ()=>{ document.removeEventListener('keydown', handleKeyDown); }
  },[questionsAnswers, activeQuestion, textAreaActive]);

  const handleKeyDown = (evt:any)=>{
    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;
    let keyPressed = evt.key;
    const len = questionsAnswers.questions.length;

    console.log('key pressed',keyPressed);
    switch( keyPressed ){
      case 'n':
        setActiveQuestion( (activeQuestion)=> activeQuestion >= (len-1) ? len-1 :  activeQuestion + 1 ); break;
      case 'm':
        setActiveQuestion( (activeQuestion)=> activeQuestion <= 1 ? 1 : activeQuestion - 1 ); break;
      case 'x':
        data.list[props.activeNote] = deleteQuestions( data.list[props.activeNote], [JSON.stringify(activeQuestion)] );
        data.list[props.activeNote] = adjustNumbers( data.list[props.activeNote]);
        dispatch( storage.setData(data) );
        setQuestions( data );
        setActiveQuestion( (activeQuestion)=> activeQuestion >= (len-1) ? len-2 :  activeQuestion ); break;

      case 'a': //add new question
        addNewQuestion( activeQuestion ); break;
      case 'Escape':
        setTextareaActive({active: false, index: activeQuestion}); break;
      case 'Enter':
        setTextareaActive({active: true, index: activeQuestion}); break;
    }

  };

  const setQuestions = (data: iUserData)=>{
    let daily = data.list[props.activeNote];
    const questionAnswerSplit = splitAwayQuestionAndAnswers(daily);

    // BUGG
    // Removes the first and last element which for some reasons are empty of questions
    // and answers
    questionAnswerSplit.questions.pop(); questionAnswerSplit.answers.pop();
    // questionAnswerSplit.answers.shift(); questionAnswerSplit.questions.shift();

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
    if( index === activeQuestion ) return {backgroundColor: 'orange'};
    if( index === highlightedQuestion ) return {backgroundColor: 'lightgray'};
    else return {backgroundColor: 'white'}
  }

  return(
    <Container fluid className="px-0 mx-0" id="explodeQuestions">
      { questionsAnswers.questions.length <= 1 && 
        <Row> <div 
        onClick={ ()=>{
          for(let i=0; i<7; i++){ addNewQuestion(0) }
        }}
        id="noQuestions">add question + </div> </Row>
      }
      <Row className='no-gutters'>
        <Col>
          <div style={{ height: 500, overflow: 'auto'}}>
            { questionsAnswers.questions.map( (question:string, index:number)=>{
              if( index === 0) return <span key={index}></span>
              return(
                <div 
                className="questionContainer noselect" 
                style={ onBackgroundColor(index) }
                onMouseEnter={()=>{ setHighlightedQuestion( index ); }}
                key={index} >

                  <div style={ displayText(index)}
                  onClick={ ()=>{
                    setActiveQuestion(index);
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


                    <span className="commandIcon addNewQuestion"
                      onClick={ ()=>{ setTextareaActive({active: true, index: index}); }}
                    >e</span>

                    <span className="commandIcon addNewQuestion"
                    onClick={ ()=>{ addNewQuestion(index); }}
                    >+</span>
                  </div>

                </div>
              )
            })}
          </div>
        </Col>

        <Col>
          <div style={{ height: 500, overflow: 'auto'}}>
            { questionsAnswers.answers.map( (answers:string, index:number)=>{
              if( index === 0) return <span key={index}></span>

              return(
                  <div  
                  key={index}
                  onMouseEnter={()=>{ setHighlightedQuestion( index ); }}
                  onClick={ ()=>{ setActiveQuestion(index); }}
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