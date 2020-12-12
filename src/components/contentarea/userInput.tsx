
import React, {useState, useEffect, CSSProperties, useRef, createRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {save} from '../../js/storageHandling';
import execute from '../../js/textManipulation/execute/execute';
import storage from '../../store/data/action'
import {iUserData} from '../../templatesTypes';

interface Props {
  data: {
    activeNote: number,
    placeholder: string,
    name: string,
    tabIndex?: number,
  }
  style?: object;
  forceUpdate: any;
}

export function UserInput( props: Props){
  const {name, placeholder, activeNote, tabIndex} = props.data;

  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');
  const textareaRef= useRef<any>(createRef());

  useEffect( ()=>{
    let nText = data.list[activeNote][name];
    if( nText === undefined) nText = "";
    setText(nText);
  }, [props, data.list]) //eslint-disable-line


  useEffect( ()=>{
    document.addEventListener('keyup', handleKeyDown);
    return ()=>{ document.removeEventListener('keyup', handleKeyDown); }
  },[props])

  const handleKeyDown = (evt:any)=>{
    if( evt.key === 'i'){
      if( document && document.activeElement && document.activeElement.tagName !== 'BODY') return;
      textareaRef.current.focus();
    }
  }

  const checkKeyStrokes = (evt:any)=>{
    let value:string = '\n' + evt.currentTarget.value;


    //execute all the commands in the userInput field
    const re = /\nexe\n|\ne\n|\nsend\n/
    if( evt.key === 'Enter' && (value + '\n').match(re)){
      let newData = {...execute( {...data}, props.data.activeNote )};
      setText( (newData.list[activeNote].userInput || "" ).trim());
      dispatch( storage.setData(newData) );
      save( newData );
      // props.forceUpdate();
    }

    // Delete userinput if c+enter on a new line
    if( evt.key === 'Enter' && (value + '\n').match(/\nc\n/)){
      data.list[activeNote].userInput = '';
      setTimeout( ()=> setText(""), 5);
      dispatch( storage.setData({...data}) );
      save( data );
      return;
    }

  }

  const onChange = (evt:any): void=>{
    const _text: string = evt.target.value;
    let nData:any = Object.assign({}, data)
    nData.list[activeNote][name] = _text;
    save(data);
    setText( _text );
  }

  return(
    <span id="userInput" style={{position: 'relative'}}>
      <textarea 
        value={ text || ""}
        placeholder={placeholder || ""}
        style={ props.style ? {...styling.textarea, ...props.style} : styling.textarea } 
        name={name || ""} 
        id="userInput"
        tabIndex={tabIndex || 1}
        onChange={ onChange }
        ref={textareaRef}
        onKeyDown={ checkKeyStrokes}
      />
      <div 
        onClick={ ()=>{
          let newData = {...execute( data, props.data.activeNote )};
          setText( (newData.list[activeNote].userInput || "" ).trim());
          dispatch( storage.setData(newData) );
          save( newData );
          props.forceUpdate();
        }}
        style={button}>Execute commands</div>
    </span>
  )
}

 
const styling = {
  textarea: {
    width: '100%',
    height: '100%',
    padding: '5px',
    positino: 'relative',
  },
}

const button = {
  position: 'absolute',
  bottom: 2,
  right: 0,
  fontSize: 10,
  opacity: 0.4,
  padding: '3px 10px',
  backgroundColor: 'black',
  color: 'white',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: 3,
  zIndex: 99999999999,
} as CSSProperties
export default UserInput;