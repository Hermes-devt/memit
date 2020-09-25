
import React, {useState, useEffect, CSSProperties} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {save} from '../../js/storageHandling';
import exe from '../../js/textManipulation/execute';
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
  forceUpdate?: any;
}

export function UserInput( props: Props){
  const {name, placeholder, activeNote, tabIndex} = props.data;

  const data: any = useSelector<{data: iUserData}>(state=> state.data);
  // const temptemp: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

  useEffect( ()=>{
    let nText = data.list[activeNote][name];
    if( nText === undefined) nText = "";
    setText(nText);
  }, [props, data.list]) //eslint-disable-line


  const checkKeyStrokes = (evt:any)=>{
    let value:string = '\n' + evt.currentTarget.value;

    // let strSplit: string[] = value.split('/n');

    const re = /\nexe\n|\ne\n/
    if( evt.key === 'Enter' && (value + '\n').match( re)){
      data.list = [...exe.execute( data.list, props.data.activeNote )];
      setText(data.list[activeNote].userInput.trim());
      dispatch( storage.setData(data) );
      save( data );
      props.forceUpdate();
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
        // id={name || "" }
        id="userInput"
        tabIndex={tabIndex || 1}
        onChange={ onChange }
        onKeyDown={ checkKeyStrokes}
      />
      <div 
        onClick={ ()=>{
          data.list = [...exe.execute( data.list, props.data.activeNote )];
          setText(data.list[activeNote].userInput);
          dispatch( storage.setData(data) );
          save( data );
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
  // right: 10,
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