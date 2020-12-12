import React, {useState, useEffect, CSSProperties} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import '../../CSS/_explodeQuestions.scss';

interface Props{
  questionsOrAnswersData: string;
  activeQuestions: number[];
  questionMarked: number[];
  mouseOverQuestion: number;
  toParent(command:string, index:any): void;
  textAreaActive: {active: boolean, index:number};
  shiftDown?: boolean;
}

export const ExplodeArea = (props: Props)=>{
  const [explodedElements, setExplodedElements] = useState<string[]>([]);

  useEffect( ()=>{
    let str:string = props.questionsOrAnswersData ? props.questionsOrAnswersData : "";

    let text = str.split('\n') || [];
    let arr: string[] = [""];
    text.forEach( (line=>{
      const regex2 = /^\d{1,2}\./
      let m = line.match( regex2 );
      if( m !== null) 
        arr.push( line + '\n');
      else
        arr[arr.length - 1] += line + '\n';
    }));

    // console.log('arr', arr);
    let last = arr.length > 0 ? arr[arr.length - 1] : "";
    let te = last.split('\n\n') || [];
    if( te.length > 1 ){
      let q:string = te.shift() || "";
      arr[arr.length - 1] = q;
      arr.push('\n\n' + te.join('\n'));
    }else{
      arr.push('');
    }
    setExplodedElements( arr );
  }, [props.questionsOrAnswersData]);

  const displayTextarea = (index:number)=> props.textAreaActive.active && props.textAreaActive.index === index ? {display: 'block'} : {display: "none"};
  const displayText = (index:number)=> props.textAreaActive.active && props.textAreaActive.index === index ? {display: "none"} : {display: 'block'};

  const onBackgroundColor = (index:number)=> {
    if( props.activeQuestions.includes(index)) return {backgroundColor: 'orange'};
    if( index === props.mouseOverQuestion) return {backgroundColor: 'lightgray'};
    if( props.questionMarked && props.questionMarked.includes(index)){
      return {backgroundColor: 'blue', color: 'white'};
    }
    else return {backgroundColor: 'white', color: ''}
  }
  

  return(
    <div style={{backgroundColor: '', height: '100%', overflow: 'auto', overflowX: "hidden"}}>
    <Container id='explodeQuestions'>

      { explodedElements.map( (element: string, index:number)=>{
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
                // activeQuestions: number[];
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
              // setTextareaActive({active: true, index: index}); 
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
          />



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