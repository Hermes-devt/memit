import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import '../../CSS/_explodeQuestions.scss';
import splitAwayQuestionAndAnswers from '../../js/textManipulation/splitAwayQuestionAndAnswers';

interface Props{
  questionsOrAnswersData: string;
  activeQuestions: number[];
  questions?: string;
  answers?: string;
  data: any;
  activeNote: number;
  mouseOverQuestion: number;
  toParent(command:string, index:any): void;
  textAreaActive: {active: boolean, index:number};
  shiftDown?: boolean;
}

export const ExplodeAreaMobile = (props: Props)=>{
  // const [explodedElements, setExplodedElements] = useState<string[]>([]);
  const [questionAnswerSplit, setQuestionsAnswersSplit] = useState<{questions: string[], answers:string[]}>({questions: [], answers: []})

  useEffect( ()=>{
    // console.log( props.data.list[props.activeNote]);
    let split = splitAwayQuestionAndAnswers( props.data.list[props.activeNote])
    console.log('split', split);

    setQuestionsAnswersSplit( split );
  },[props.questionsOrAnswersData]) //eslint-disable-line


  return(
    <div style={{backgroundColor: '', height: '100%', overflow: 'auto', overflowX: "hidden"}}>
    <Container id='explodeQuestions' className="noselect">
      <div id="questionBox">
        {questionAnswerSplit.questions[props.activeQuestions[0]]}
      </div>

      <div id="answerBox">
        {questionAnswerSplit.answers[props.activeQuestions[0]]}
      </div>


      <div id="commandContainer">
        <span className="icon addNewQuestion" onClick={ ()=>{ 
          // props.toParent('addNewQuestion', props.activeQuestions[0])
        }} >&lt;</span>
        <span className="icon deleteQuestion"
        onClick={ ()=>{
            props.toParent('deleteQuestion', props.activeQuestions[0]);
          }}>X</span>

        <span className="icon addNewQuestion" onClick={ ()=>{ 
          props.toParent('editQuestion', {active: true, index: props.activeQuestions[0]});
        }}
        >e</span> 

        <span className="icon addNewQuestion" onClick={ ()=>{ 
          props.toParent('addNewQuestion', props.activeQuestions[0])
        }} >+</span>

        <span className="icon addNewQuestion" onClick={ ()=>{ 
          // props.toParent('addNewQuestion', props.activeQuestions[0])
        }} >&gt;</span>
      </div>
    </Container>
      {/* { explodedElements.map( (element: string, index:number)=>{
        if( index <= 0) return <span key={index}></span>
        // 
        return(
          <div 
          className="questionContainer noselect" 
          style={ onBackgroundColor(index) }
          onMouseEnter={()=>{ props.toParent("mouseOver", index); }}
          key={index} >
            <div 
            style={ displayText(index)}
            onClick={ ()=>{
              if( props.shiftDown){
                let nArr = new Set([...props.activeQuestions]);
                nArr.has(index) ? nArr.delete(index) : nArr.add(index);
                let mhl = Array.from(nArr);
                props.toParent( 'activeElements', mhl );
                return;
              }
              props.toParent( 'activeElements', [index]);
              if( props.textAreaActive.active ){
                props.toParent('editQuestion', {active: false, index: index});
              }
            }}
            onDoubleClick={ ()=>{ 
              props.toParent('editQuestion', {active: true, index: index});
            }}
            >{element}
          </div>

          <textarea 
            rows={3} 
            style={ displayTextarea(index) }
            className="questionArea" 
            onChange={ (evt)=>{ 
              // let newQuestions = {...questionsAnswers};
              // newQuestions.questions[index] = evt.currentTarget.value;
              // setQuestionsAnswers( newQuestions);
            }} 
            // onBlur={ ()=>{ setTextareaActive({active: false, index: index}); }}
            autoFocus
            value={element} 
          /> */}



            {/* <div className="commandContainer">
              <span className="commandIcon deleteQuestion"
              onClick={ ()=>{
                  props.toParent('deleteQuestion', index);
                }}>X</span>

              <span className="commandIcon addNewQuestion" onClick={ ()=>{ 
                props.toParent('editQuestion', {active: true, index: index});
              }}
              >e</span> 

              <span className="commandIcon addNewQuestion" onClick={ ()=>{ 
                props.toParent('addNewQuestion', index)
              }} >+</span>
            </div> */}

          {/* </div>
        )
      })} */}
    {/* </Container> */}
    </div>
  )
}

export default ExplodeAreaMobile;