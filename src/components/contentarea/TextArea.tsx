
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {save} from '../../js/storageHandling';
import {iUserData} from '../../templatesTypes';

interface Props {
  data: { activeNote: number, placeholder: string, name: string, tabIndex?: number };
  style?: object;
}

export function TextArea( props: Props){
  const {name, placeholder, activeNote, tabIndex} = props.data;

  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  const [text, setText] = useState<string>('');

  useEffect( ()=>{
    let nText = data.list[activeNote][name] || "";
    setText(nText);
  }, [props, data.list]) //eslint-disable-line

  const onChange = (evt:any)=>{
    const _text: string = evt.target.value;
    let nData:any = Object.assign({}, data)
    nData.list[activeNote][name] = _text;
    save(data);
    setText( _text );
  }

  const textAreaStyling = {width: '100%', height: '100%', padding: '5px'};
  return(
      <textarea 
        value={ text || ""}
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