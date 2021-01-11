import React, {useState, useEffect, useRef} from 'react';
import {Container} from 'react-bootstrap';
import {iUserClass, iQuestionAnswerPair, tQuestionAnswerPair, iQuestionAnswer} from '../../templatesTypes';
import '../../CSS/_explodeQuestions.scss';
var Latex = require('react-latex');

interface Props{
  questionsOrAnswersData: any;
  activeQuestions: number[];
  toParent(command:string, index:any): void;
  textAreaActive: {active: boolean, index:number};
  shiftDown?: boolean;
  onChangedQuestion?: any;
  question: string;
  onChange(value:string):void;
  setFocusOnTextInput?: boolean;
  value: string;
  children?: any;
}

export const ExplodeArea = (props: Props)=>{
  const [pastTextAreaValue, setPastTextAreaValue] = useState<boolean>(false);
  const [questionAnswerPair, setQuestions] = useState<iQuestionAnswerPair[]>([]);

  useEffect( ()=>{
    setQuestions( props.questionsOrAnswersData);
  }, [props.questionsOrAnswersData]);


  const displayTextarea = (index:number)=> props.activeQuestions[0] === index && props.textAreaActive.active ? {display: 'block'} : {display: "none"};
  const displayText = (index:number)=> props.textAreaActive.active && props.textAreaActive.index === index ? {display: "none"} : {display: 'block'};

  // const areaRef = useRef<any>();

  const onBackgroundColor = (index:number)=> {
    if( props.activeQuestions.includes(index)) 
      return {backgroundColor: 'orange'};
    else 
      return {};
  }

  useEffect( ()=>{
    if( pastTextAreaValue === true && props.textAreaActive.active === false){
      if( props.onChangedQuestion){
        // props.onChangedQuestion(areaRef.current.value, props.textAreaActive.index );
      }
    }

    setPastTextAreaValue(props.textAreaActive.active);
    // if(props.setFocusOnTextInput && props.textAreaActive.active){
      // setTimeout( ()=>{ 
      //   if( !areaRef || !areaRef.current) return;
      //   areaRef.current.focus(); 
      //   areaRef.current.setSelectionRange(areaRef.current.value.trim().length, areaRef.current.value.trim().length);
      // }, 10);
    // }
  }, [props.textAreaActive])


  return(
    <div style={{backgroundColor: '', height: '100%', overflow: 'auto', overflowX: "hidden"}}>
    <Container id='explodeQuestions'>

      { questionAnswerPair.map( (element: any, index:number)=>{
        return(
          <div 
          style={ element.style ? {...element.style, ...onBackgroundColor(index)} : onBackgroundColor(index) }
          className="questionContainer noselect" 
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

              if( props.textAreaActive.active){
                props.toParent('editQuestion', {active: false, index: props.textAreaActive.index});
                return;
              }else{
                props.toParent( 'activeElements', [index]);
              }
            }}
            onDoubleClick={ ()=>{ 
              props.toParent('editQuestion', {active: true, index: index}); 
            }}
            >
              <Latex>
              {/* <Latex displayMode={true}> */}
                {index+1 + ". " + element[props.question as keyof iQuestionAnswerPair].text}
              </Latex>
            
          </div>

          <div>
           <textarea 
            rows={3} 
            className="questionArea" 
            style={ displayTextarea(index) }
            onChange={ (evt)=>{ 
              let nList:any = [...questionAnswerPair];
              nList[index][props.question as keyof iQuestionAnswerPair].text = evt.currentTarget.value;
              setQuestions(nList);
            }} 
            autoFocus
            value={ element[props.question].text}
          />
         </div>

            <div className="commandContainer">
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
            </div>

          </div>
        )
      })}
    </Container>
    </div>
  )
}

export default ExplodeArea;