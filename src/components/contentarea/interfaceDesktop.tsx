import React from 'react';
import TextArea from './TextArea';
import ExplodeArea from './explodeArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import UserInput from './userInput';
import {iUserClass, iQuestionAnswerPair, tQuestionAnswerPair} from '../../templatesTypes';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../../store/data/action'
import {save} from '../../js/storageHandling';
import '../../CSS/interfaceOptions.scss';
// import {} from 'react-latex';




interface Props {
  layout: number,
  activeNote: number,
  forceUpdate: any,
}

interface iTextAreaFields{
  question: string;
  answer: string
}

export function InterfaceDesktop(props: Props){
  const data: any = useSelector<{data: iUserClass}>(state=> state.data);
  const [activeQuestions, setActiveQuestions] = useState<number[]>([0]);
  const [questionAnswerPair, setQuestionAnswerPair] = useState<iQuestionAnswerPair[]>( data.get.list()[props.activeNote].questionAnswerPair)
  const [explodeView, setExplodeView] = useState<boolean>(true);

  const [textAreaActive, setTextareaActive] = useState<{active: boolean, index:number}>({active:false, index: 0});
  const [shiftDown, setShiftDown] = useState<boolean>(false);

  const [textAreaTextHolder, setTextAreaTextHolder] = useState<iTextAreaFields>({ question: '', answer: ''});
  const [forceUpdateTextArea, setForceUpdateTextArea] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect( ()=>{
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return ()=>{ 
      document.removeEventListener('keydown', handleKeyDown); 
      document.removeEventListener('keyup', handleKeyUp ); 
    }

  },[props, props.activeNote,textAreaActive, activeQuestions, explodeView, data, shiftDown, textAreaTextHolder]);//eslint-disable-line

  useEffect( ()=>{
    if( activeQuestions[0] > 0 && activeQuestions[0] <= questionAnswerPair.length ){
      setTextAreaTextHolder({
        question: questionAnswerPair[activeQuestions[0]].question.text,
        answer: questionAnswerPair[activeQuestions[0]].answer.text
      })
    }else{
      if( activeQuestions[0] !== 0)
        setActiveQuestions([0]);
    }
  }, [activeQuestions, props.activeNote])//eslint-disable-line


  useEffect( ()=>{
    setQuestionAnswerPair( data.get.list()[props.activeNote].questionAnswerPair );
  }, [data, props.activeNote])


  useEffect( ()=>{
    if( textAreaActive.active ){
      setTextareaActive({active: false, index: 0});
    }else{
    }
    setActiveQuestions([0]);
  }, [props.activeNote])


  const handleKeyUp = (evt:any)=>{ if( evt.key === 'Shift'){ setShiftDown(false); }}

  const handleKeyDown = (evt:any)=>{

    let keyPressed = evt.key;


    if( !explodeView && keyPressed === 'Escape'){

      if( !explodeView && props.layout !== 4){
        let arr = textAreaTextHolder.question.trim().split('\n');
        let arr2 = textAreaTextHolder.answer.trim().split('\n');

        const seperator = (arrayToBeSplit: string[]): string[]=>{
          let qa:any = [];
          arrayToBeSplit.forEach( (item:string, index:number)=>{
            let text = item ? item : "";
            if( item.match(/\d+. ?/)){
              qa.push( item )
            }else{
              if( qa.length > 0)
                qa[qa.length -1] += + '\n' + text;
            }
          })
          if( qa.length === 0)
            qa.push("");
          return qa;
        }

        let questionsArr = seperator(arr);
        let answersArr= seperator(arr2);
  

        let questionPair = []

        for( let i =0; i<questionsArr.length; i++){

          let questionMatch = questionsArr[i].match(/\d+. ?/);
          if( questionMatch ){

            let answerText = '';
            for( let m=0; m<answersArr.length; m++){
              let answerMatch= answersArr[m].match(/\d+. ?/)
              if( answerMatch && answerMatch[0] === questionMatch[0]){
                answerText = answersArr[m].replace(/\d+. ?/, '')
                break;
              }
              
              
            }//end of for loop
            if( questionMatch[0]){
              questionPair.push({
                question: {text: questionsArr[i].replace(/\d+. ?/, '')},
                answer: {text: answerText},
                questionID: 555555
              })
            }
          }
        }

        if( questionPair.length === 0 ){
          let newQuestionAnswerPair = questionAnswerPair;
          newQuestionAnswerPair = [];
          newQuestionAnswerPair.push({ question: {text: ''}, answer: {text: ''}, questionID: 555555 } )
          setQuestionAnswerPair( newQuestionAnswerPair );
        }else{
          setQuestionAnswerPair( questionPair );
          data.data.list[props.activeNote].questionAnswerPair = questionPair;
        }
        setExplodeView(true);
      }

      setTextareaActive({active: false, index: activeQuestions[0]}); 
      dispatch(storage.setData( data ))
      save( data );
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
      case 'E': 
        if( props.layout !== 4)
          setExplodeView( false ); 
      break;
      case 'j': case 'ArrowDown':
        let nrOfQuestion = questionAnswerPair.length
        if( activeQuestion >= nrOfQuestion - 1) return;
         activeQuestion= activeQuestion + 1;
         setTextareaActive({active: false, index: activeQuestion});
         setActiveQuestions([activeQuestion]);
         break;
      case 'k': case 'ArrowUp':
        activeQuestion = activeQuestion === 0 ? 0 : activeQuestion - 1;
        // setActiveQuestions([activeQuestion]);
        setTextareaActive({active: false, index: activeQuestion});
        setActiveQuestions([activeQuestion]);
        break;
      case 'm': case 'z':
        activeQuestions.forEach( (value:number)=>{
          let currentQuestion = data.get.list()[props.activeNote].questionAnswerPair[value];

          if( !currentQuestion.style ){
            currentQuestion.style = {backgroundColor: 'blue', color: 'white'};

          } else if( !currentQuestion.style.backgroundColor ){
            currentQuestion.style = {...currentQuestion.style, ...{backgroundColor: 'blue', color: 'white'}};

          }else{
            delete currentQuestion.style.backgroundColor;
            delete currentQuestion.style.color;
            if( Object.keys( currentQuestion.style).length === 0 )
              delete currentQuestion.style;
          }
        })

        setQuestionAnswerPair( [...data.get.list()[props.activeNote].questionAnswerPair])
        break;
      case 'x': 
        deleteQuestion(); 
        return;
        // break;
      case 'a': 
        addNewQuestion( activeQuestion );
        setActiveQuestions( [activeQuestions[0] + 1]);
        break;
      case 'Escape': 
        setTextareaActive({active: false, index: activeQuestion}); 
        setActiveQuestions( [activeQuestions[0]] || [0] );

        data.get.list()[props.activeNote].questionAnswerPair = [...questionAnswerPair];
        if( shiftDown ){
        }
        break;
      case 'Enter': case 'e':
        if( shiftDown ){
          console.log('shift is down')
        }
        setTextareaActive({active: true, index: activeQuestion}); 
        break;
      case 'K': //Shift question one step upwards

        let temp2 = [...activeQuestions.sort()];
        let breakAt = 0;
        for( let i =0; i < temp2.length; i++){
          let active = temp2[i];
         
          if( breakAt >= active){
            breakAt++; continue;
          }

          temp2[i] -= 1;
          let extractedQuestion = questionAnswerPair[active];
          questionAnswerPair.splice( active, 1);
          questionAnswerPair.splice( active-1, 0, extractedQuestion);
        }
        setQuestionAnswerPair( [...questionAnswerPair])
        setActiveQuestions( [...temp2] );
        data.get.list()[props.activeNote].questionAnswerPair = questionAnswerPair;
      break;
      case 'J': //shift question one step downwward
        let newActiveQuestions = [...activeQuestions.sort().reverse()];
        let breakAt2 = questionAnswerPair.length - 1;
        for( let i=0; i < newActiveQuestions.length; i++){
          let active = newActiveQuestions[i];
          if( breakAt2 <= active){
            breakAt2--; continue;
          }

          newActiveQuestions[i] += 1;
          let extractedQuestion2 = questionAnswerPair[active];
          questionAnswerPair.splice( active, 1);
          questionAnswerPair.splice( active+1, 0, extractedQuestion2);
          setQuestionAnswerPair( [...questionAnswerPair])
        }

        data.get.list()[props.activeNote].questionAnswerPair = questionAnswerPair;
        setActiveQuestions( newActiveQuestions.reverse() );
        break;
    }

    dispatch(storage.setData( data ))
    save( data );

  };


  const explodeAreaToParent = (command:string, index:any)=>{
    switch(command){
      // case 'mouseOver': setMouseOverQuestion_index(index); break;
      case 'addNewQuestion': addNewQuestion(index); break;
      // case 'deleteQuestion': deleteQuestion(index); break;
      case 'activeElements': setActiveQuestions( index ); break;
      case 'editQuestion': 
        setActiveQuestions([index.index]);
        setTextareaActive(index); 
      break;
    }
  }

  const deleteQuestion = (questionToDelete?: number)=>{
    let questionList = [...questionAnswerPair];

    let temp = [...activeQuestions.sort().reverse()];

    temp.forEach( (active: any, index:number)=>{
      if( questionList.length <= 1){
        questionList[0].question.text = '';
        questionList[0].answer.text = '';
      }else{
        questionList.splice( active, 1);
      }
    })
    let activeQuestion:number = activeQuestions.reverse()[0] || 0;

    if( questionList.length <= activeQuestion)
      activeQuestion -= 1;

    if(activeQuestion < 0)
      activeQuestion = 0;

    data.get.list()[props.activeNote].questionAnswerPair = [...questionList];
    dispatch( storage.setData(data) );
    save( data );
    setQuestionAnswerPair( questionList );
    setActiveQuestions( [activeQuestion] );
    save( data );
  }

  const addNewQuestion = (index:number)=>{
    questionAnswerPair.splice( activeQuestions[0]+1, 0,  tQuestionAnswerPair( '', ''));

    setQuestionAnswerPair( [...questionAnswerPair]);
    data.get.list()[props.activeNote].questionAnswerPair = questionAnswerPair;
    dispatch( storage.setData(data) );
  }

  const textAreaChange = (question_answer_text: string, accessName: string)=>{
    textAreaTextHolder[accessName as keyof iTextAreaFields] = question_answer_text;
  }

  const getUserInputElement = (containerStyle: string)=>{ return( 
    <div className={containerStyle}>
      <UserInput
        forceUpdate={()=>{
          props.forceUpdate()
          setForceUpdateTextArea( Math.random() );
        }}
        data={{
          activeNote: props.activeNote,
          placeholder: "User input",
          name: "userInput",
        }}
      />
    </div>
  ) }

  return (
    <span id="interfaceContainer">
      <Container fluid className="px-0 mx-0">
        <Row className="no-gutters">
          <Col style={{borderRight: '1px solid black'}}>
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
                    name: "question",
                  }}
                  forceUpdateTextArea={ forceUpdateTextArea }
                  questionAnswerPair={ questionAnswerPair}
                  textChange={ textAreaChange }
                />
              }

              { (explodeView) &&
                <ExplodeArea
                  activeQuestions={activeQuestions}
                  setFocusOnTextInput={true}
                  toParent={explodeAreaToParent}
                  shiftDown={shiftDown}
                  onChange={ (newValue:string)=>{
                    textAreaTextHolder.question = newValue;
                    setTextAreaTextHolder( {...textAreaTextHolder});
                  }}
                  value={ textAreaTextHolder.question }
                  textAreaActive={textAreaActive}
                  question={'question'}
                  questionsOrAnswersData={questionAnswerPair}
                >
                </ExplodeArea>
              }
            </div>

            {props.layout === 2 && ( <span> { getUserInputElement("textareaUserInput_middleColumn")} </span>)}
          </Col>
          {props.layout === 1 && ( <Col> { getUserInputElement("textareaFullSize")} </Col>)}

          {props.layout !== 4 && (
            <Col className="">
              <div className="textareaFullSize">
                {!explodeView && (
                  <TextArea
                    data={{
                      activeNote: props.activeNote,
                      placeholder: "Answers",
                      name: "answer",
                    }}
                    forceUpdateTextArea={ forceUpdateTextArea }
                    questionAnswerPair={ questionAnswerPair }
                    textChange={ textAreaChange }
                  />
                )}
                {explodeView && (
                  <ExplodeArea
                    activeQuestions={activeQuestions}
                    toParent={explodeAreaToParent}
                    shiftDown={shiftDown}
                    onChange={ (newValue:string)=>{
                      textAreaTextHolder.answer = newValue;
                      setTextAreaTextHolder( {...textAreaTextHolder});
                    }}
                    textAreaActive={textAreaActive}
                    value={ textAreaTextHolder.answer}
                    question={'answer'}
                    questionsOrAnswersData={questionAnswerPair}
                  >
                </ExplodeArea>
                )}
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </span>
  );
}
 
export default InterfaceDesktop;