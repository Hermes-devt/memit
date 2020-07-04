import React, {useState, useEffect} from 'react';


interface Props{
  placeholder?: string;
  value?: string | number;
  style?: object;
  onChange(nr: number):void;
  readOnly?: boolean;
  stopPropagation?: boolean;
}


export function InputText(props: Props){
  const [value, setValue] = useState<string>("");
  useEffect( ()=>{
    let value: string = String(props.value) || "";
    setValue( value );
  },[props]) //eslint-disable-line

  return(
    <input 
      readOnly={ props.readOnly || false }
      value={ value }
      placeholder={ props.placeholder || "" }
      style={ props.style || {}}

      onClick={ (evt)=>{
        if( props.stopPropagation )
          evt.stopPropagation();
      }}

      onChange={ (evt)=>{
        let {value} = evt.target;
        if( value.length > 0 && isNaN(Number(value)))
          return;

        setValue( value );
        if( value === "") value = '0';
        let returnValue: number = Number(value);
        props.onChange( returnValue );
      }}
    />
  )
}


export default InputText;