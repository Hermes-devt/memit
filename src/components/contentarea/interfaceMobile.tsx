import React from 'react';
import {useState, useEffect, useRef, createRef} from 'react';
import {Container} from 'react-bootstrap';
import {iUserClass, iQuestionAnswerPair, tQuestionAnswerPair} from '../../templatesTypes';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import storage from '../../store/data/action'
import {save} from '../../js/storageHandling';
import '../../CSS/interfaceOptions.scss';

interface Props {
  layout: number,
  activeNote: number,
}

export function InterfaceMobile(props: Props){
  const data: any = useSelector<{data: iUserClass}>(state=> state.data);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [nrOfQuestions, setNrOfQuestions] = useState<number>(1);
  const [questionAnswerSplit, setQuestionsAnswersSplit] = useState<iQuestionAnswerPair[]>(data.get.list()[props.activeNote].questionAnswerPair)
  const [displayAnswer, setDisplayAnswer] = useState<boolean>(false);
  const [addQuestionOn, setAddQuestion] = useState<boolean>(false);

  const [shiftDown, setShiftDown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const newQuestion = useRef<any>(createRef())
  const newAnswer = useRef<any>(createRef())

  useEffect( ()=>{
    let questionPair: iQuestionAnswerPair[] = data.get.list()[props.activeNote].questionAnswerPair
    setQuestionsAnswersSplit( data.get.list()[props.activeNote].questionAnswerPair )
    setQuestionsAnswersSplit( questionPair )

    let len:number = data.get.list()[props.activeNote].questionAnswerPair.length;

    setNrOfQuestions(len);
    setActiveQuestion(0)
    setAddQuestion( false );
  },[props.activeNote])//eslint-disable-line


  useEffect( ()=>{
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return ()=>{ 
      document.removeEventListener('keydown', handleKeyDown); 
      document.removeEventListener('keyup', handleKeyUp ); 
    }

  },[props, data, activeQuestion, questionAnswerSplit, nrOfQuestions, addQuestionOn]); //eslint-disable-line


  useEffect( ()=>{ setDisplayAnswer(false); },[activeQuestion, props])

  const handleKeyUp = (evt:any)=>{ 
    if( evt.key === 'Shift'){ 
      setShiftDown(false); 
    }
  }


  const handleKeyDown = (evt:any)=>{
    let keyPressed = evt.key;

    if( keyPressed === 'Shift'){
      setShiftDown(true);
      return;
    }

    if( document && document.activeElement && document.activeElement.tagName !== 'BODY') 
      return;

    if( keyPressed === "ArrowLeft" || keyPressed ==='ArrowRight') 
      evt.preventDefault();

    switch( keyPressed ){
      case 'j': case 'ArrowRight': moveRight(); break;
      case 'k': case 'ArrowLeft': moveLeft(); break;
      case 'x':
        deleteQuestion();
      break;
      case 'a': 
        setAddQuestion(true);
        addNewQuestion(); break;
      case 'K': //Shift question one step upwards
        if( activeQuestion <= 0) return;
        let extractedQuestion = questionAnswerSplit[activeQuestion];
        questionAnswerSplit.splice( activeQuestion, 1);
        questionAnswerSplit.splice( activeQuestion-1, 0, extractedQuestion);
        setQuestionsAnswersSplit( [...questionAnswerSplit])

        let active2:number = activeQuestion > 0 ? activeQuestion-1 : 0;
        setActiveQuestion( active2 ); 
        data.get.list()[props.activeNote].questionAnswerPair = questionAnswerSplit;
      break;
      case 'J': //shift question one step uwpards
        if( activeQuestion >= questionAnswerSplit.length - 1) return;
        let extractedQuestion2 = questionAnswerSplit[activeQuestion];
        questionAnswerSplit.splice( activeQuestion, 1);
        questionAnswerSplit.splice( activeQuestion+1, 0, extractedQuestion2);
        setQuestionsAnswersSplit( [...questionAnswerSplit])

        setActiveQuestion( (activeQuestion)=> activeQuestion+1); 
        data.get.list()[props.activeNote].questionAnswerPair = questionAnswerSplit;
        break;
    }

  };

  const deleteQuestion = ()=>{
    let questionList = questionAnswerSplit;
    let active = activeQuestion;
    if( questionList.length <= 1){
      questionList[0].question.text = '';
      questionList[0].answer.text = '';
    }else{
      questionList.splice( active, 1);
    }

    if( questionList.length <= active)
      active -= 1;

    if(activeQuestion < 0)
      active = 0;

    setActiveQuestion( active );
    setQuestionsAnswersSplit( questionList );

    setNrOfQuestions( (nrOfQuestions:number) => nrOfQuestions > 0 ? nrOfQuestions - 1 : 0);

    data.get.list()[props.activeNote].questionAnswerPair = questionList;
    dispatch( storage.setData(data) );
  }

  const moveLeft = ()=>{
      let newActiveQuestion = activeQuestion <= 0 ? 0 : activeQuestion - 1;
      setAddQuestion(false);
      setActiveQuestion(newActiveQuestion);
  }

  const moveRight = ()=>{
    if( activeQuestion + 1 >= questionAnswerSplit.length) return;
      setActiveQuestion(activeQuestion=> activeQuestion+1 );

  }


  const addNewQuestion = ()=>{

    let last = questionAnswerSplit[ questionAnswerSplit.length-1 ];
    if( last.question.text === ''){

      let pos = questionAnswerSplit.length - 1;
      if( pos < 0) pos = 0;
      setActiveQuestion( pos );
      return;
    }

    questionAnswerSplit.push( tQuestionAnswerPair( '', ''));

    setQuestionsAnswersSplit( [...questionAnswerSplit]);

    let pos = questionAnswerSplit.length - 1;
    if( pos < 0) pos = 0;
    setActiveQuestion( pos );
    setNrOfQuestions( questionAnswerSplit.length );

    data.get.list()[props.activeNote].questionAnswerPair = questionAnswerSplit;
    dispatch( storage.setData(data) );
  }

  const appendQuestinoAndAddNewQuestion = ()=>{
    if( newQuestion.current.value.trim() === '') return;
    questionAnswerSplit[questionAnswerSplit.length-1].question.text = newQuestion.current.value.trim();
    questionAnswerSplit[questionAnswerSplit.length-1].answer.text = newAnswer.current.value.trim();

    setQuestionsAnswersSplit( [...questionAnswerSplit]);
    setNrOfQuestions( questionAnswerSplit.length );
    data.get.list()[props.activeNote].questionAnswerPair = questionAnswerSplit;
    dispatch( storage.setData(data) );
    save( data );

  }

  const setAreaIfNoQuestions = ()=>{ 
    return( 
      <div id="ifNoQuestions">
        <textarea ref={newQuestion} placeholder='Question' className="inputboxIfNoQuestions" autoFocus/>
        <div id="answerBlock">
          <textarea ref={newAnswer} placeholder='Answer' id="answerArea" />
          <div id="saveQuestion" onClick={ ()=>{ 
            setAddQuestion(false);
            appendQuestinoAndAddNewQuestion(); 
          }}>save</div>
        </div>
      </div>
    ) 
  }

  const setQuestionBox = ()=>{
    let question: string = questionAnswerSplit[activeQuestion].question.text;
    const cleanInterface = true;
    return(
      <div style={{position: 'relative', top: '30px'}}>
        { !cleanInterface && <div id="top" >
          <div className="rotatingElement" style={{height: '15px', fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
          >{ activeQuestion >= 3 ? questionAnswerSplit[activeQuestion-3].question.text : "" }</div>

          <div className="rotatingElement" style={{height: '15px', fontSize: '13px', lineHeight: '13px', opacity: 0.2, top: ''}}
          >{ activeQuestion >= 2 ? questionAnswerSplit[activeQuestion-2].question.text : "" }</div>

          <div className="rotatingElement" style={{height: '', fontSize: '17px', lineHeight: '20px', opacity: 0.3, top: '50px'}}
          >{(activeQuestion >= 1) ? questionAnswerSplit[activeQuestion-1].question.text : ""}</div>
        </div> }

        { question.length <= 0 && <span>
            {((questionAnswerSplit.length <= 1) && !cleanInterface) && <div className="deckEmptyText">Deck currently empty!</div>}
            <textarea ref={newQuestion} placeholder='Question' className="textAnswerInput" / > 
            </span>}
        { question.length > 0 && <div className="rotatingElement activeQuestion">{question}</div> }

        {!cleanInterface && <div id='bottom'>
          <div className="rotatingElement" style={{fontSize: '17px', lineHeight: '20px', opacity: 0.3, top: ''}}
          >{(activeQuestion + 1< questionAnswerSplit.length) ? questionAnswerSplit[activeQuestion+1].question.text : ""}</div>

          <div className="rotatingElement" style={{fontSize: '13px', lineHeight: '10px', opacity: 0.2, top: ''}}
          >{ (activeQuestion + 2 < questionAnswerSplit.length) ? questionAnswerSplit[activeQuestion+2].question.text : '' }</div>

          <div className="rotatingElement" style={{fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
          >{ (activeQuestion + 3< questionAnswerSplit.length) ? questionAnswerSplit[activeQuestion+3].question.text : "" }</div>

          <div className="rotatingElement" style={{fontSize: '10px', opacity: 0.1, paddingBottom: '1px', top: ''}}
          >{ (activeQuestion + 4 < questionAnswerSplit.length) ? questionAnswerSplit[activeQuestion+4].question.text : "" }</div>
      </div>}
    </div>)
  }


  const setAnswerBox= ()=>{
    let answer: string = questionAnswerSplit[activeQuestion].answer.text.trim();
    if( answer.trim() === ''){
        return(
          <div id="answerBlock">
            <textarea ref={newAnswer} placeholder='Answer' id="inputArea" />
            <div id="saveQuestion" onClick={ ()=>{ 
              setAddQuestion(false);
              appendQuestinoAndAddNewQuestion(); 
            }}>save</div>
          </div>)
    }else{
      if( shiftDown || displayAnswer)
        return( <span id="answerBoxText">{answer}</span>)
    }
    return <span id="answerBoxText"></span>
  }

  return(
    <div style={{position: 'relative', backgroundColor: '', height: '100%', overflow: 'auto', overflowX: "hidden"}}>
    <Container fluid id='mobile' className="px-0 mx-0 noselect">
      { (questionAnswerSplit.length <= 0) && <span>{setAreaIfNoQuestions()}</span> }

      { (questionAnswerSplit.length > 0) && <span>

        <div id="questionBox" className="box">
          <span>{setQuestionBox()}</span>

          {!addQuestionOn && <span className="clickHandler">
            <div className='clickArea left' onClick={ ()=>{ moveLeft(); }}>
              <span className="clickAreaText">&lt;</span>
            </div>
            <div className='clickArea right' onClick={ ()=>{ moveRight(); }} >
              <span className="clickAreatext2">&gt;</span>
            </div>
          </span>}

        </div>
        <div id="answerBox" className='box' 
          onClick={ ()=>{ 
            if(displayAnswer){
                moveRight();
                setDisplayAnswer( false ); 
              return;
            }
            setDisplayAnswer(true); 
          }}
          >
            <span> { setAnswerBox() } </span>
        </div>
        <div>
          {!addQuestionOn && <div id="addQuestionIcon" title="Add question" 
            onClick={ ()=>{ 
            setAddQuestion(true);
            addNewQuestion(); 
          }} >Add card
          </div>}

          {addQuestionOn === true && <span id="addQuestionIcon" title="Add question" onClick={ ()=>{
            setAddQuestion(false);
            deleteQuestion();
            }}>Cancel</span>}
        </div>

        <div id="commandContainer">
          <span className="icon" title="Edit question" onClick={ ()=>{ console.log('edit question')}} >e</span> 
        </div>


      </span>}

      <div id="counter">
        <span>{activeQuestion+1}</span>
        <span> / </span>
        <span>{nrOfQuestions}</span>
      </div>

      <span id="deleteIcon" title="Delete question" onClick={ deleteQuestion }>X</span>

    </Container>
    </div>
  )
}
 
export default InterfaceMobile;