
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {iQuestionAnswer, iQuestionAnswerPair, iUserClass} from '../../templatesTypes';

interface Props {
  data: { 
    text?: string, 
    activeNote: number, 
    placeholder: string, 
    name: string, 
    tabIndex?: number 
  };
  questionAnswerPair: iQuestionAnswerPair[];
  textChange(str: string): any; 
  forceUpdateTextArea: number;
  style?: object;
}

export function TextArea( props: any){
  const {name, placeholder, tabIndex} = props.data;

  // const data: any = useSelector<{data: iUserClass}>(state=> state.data);
  const [text, setText] = useState<string>('');

  useEffect( ()=>{
    let text2: iQuestionAnswerPair[] = props.questionAnswerPair;
    let textareaText = ''
    text2.forEach( (obj:any, index:number)=>{ 
      textareaText += index+1 + ". " + obj[name as keyof iQuestionAnswer].text.trim() + '\n' 
    });

    if( textareaText === text )return;
    setText(textareaText)
    props.textChange( textareaText, name);
  }, [ props.forceUpdateTextArea, props.data.activeNote, props.questionAnswerPair]) //eslint-disable-line


  const onChange = (evt:any)=>{
    const _text: string = evt.target.value;
    props.textChange( _text, name );
    setText( _text );
  }

  const textAreaStyling = {width: '100%', height: '100%', padding: '5px'};
  return(
      <textarea 
        key={props.forceUpdateTextArea}
        value={text}
        placeholder={placeholder || ""}
        style={ props.style ? {...textAreaStyling, ...props.style} : textAreaStyling } 
        name={name || ""} 
        id={name || "" }
        tabIndex={tabIndex || 1}
        onChange={ onChange }
      />
  )
}

 

export default TextArea;