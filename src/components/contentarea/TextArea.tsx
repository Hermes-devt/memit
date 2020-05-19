
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {save} from '../../js/storageHandling';


export function TextArea(props: any){
  const data: any = useSelector<any>(state=> state.data);
  const [text, setText] = useState([]);

  useEffect( ()=>{
    let nText = data.list[props.data.activeNote][props.data.name];
    setText(nText);
  }, [props, data.list])

  const onChange = (evt:any)=>{
    const text = evt.target.value;
    setText( text );
    let nData:any = Object.assign({}, data)

    if( props.data.name === 'userInput') return;
    nData.list[props.data.activeNote][props.data.name] = text;
    save(data);
  }

  return(
      <textarea 
        value={ text || ""}
        placeholder={props.data.placeholder || ""}
        style={ props.style ? {...styling.textarea, ...props.style} : styling.textarea } 
        name={props.data.name || ""} 
        id={props.data.name || "" }
        tabIndex={props.data.tabIndex || 1}
        onChange={ onChange }
      />
  )
}

 
const styling = {
  textarea: {
    width: '100%',
    height: '100%',
    padding: '5px',
  },
}

export default TextArea;