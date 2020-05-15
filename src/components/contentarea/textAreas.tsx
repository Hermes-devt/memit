
import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row} from 'react-bootstrap';

export function TextAreas(props:any){
  const [fieldView, setFieldView] = useState(0);
  const [activeNote, setActiveNote] = useState(0);
  const [expandDir, setExpandDir] = useState('<');

  useEffect( ()=>{
    setActiveNote( props.data.activeNote );
  },[props])

  const fieldBlock = [
    [{width: '33%'}, {width: '33%'}, {width: '33%'}], //userinput showing.
    [{width: '49%'}, {width: '0%'}, {width: '49%'}], // userinput hiden.
  ]

  const changeFieldView = (src: any)=>{
    if( expandDir === '<'){ setExpandDir(">"); setFieldView( 1 );
    }else{                  setExpandDir("<"); setFieldView(0); }
  }

  const onNavbarExpand = ()=>{
    let char = props.data.navbarExtended === '<' ? '>' : '<' 
    props.onExtendVerticalbar(char);
  }

  return(
    <Container fluid
    style={{marginLeft: '1%', padding: 0, width: props.data.navbarExtended === '<' ? '84%' : '96%' }} >
      <Row>
        <div className='vh-100' 
          style={{ ...fieldBlock[fieldView][0], ...{display: '', position: 'relative'}}}>
        <TextArea 
          data={{ 
            activeNote: activeNote,
            placeholder:"Type your answers here", 
            name: "questions" }} />
        <div 
          style={{ position:'absolute', top: '50%', left: -7, padding: '6px 2px', backgroundColor: 'black', color: 'white', cursor: 'pointer'}}
          onClick={onNavbarExpand}
        >{props.data.navbarExtended}</div>
      </div>

      <div className='vh-100' 
        style={{...fieldBlock[fieldView][1], ...{position: 'relative'}}}>
        <TextArea style={{backgroundColor: ''}} 
          data={{ 
            activeNote: activeNote, 
            placeholder:"User input", 
            tabIndex: -1, 
            name: "userInput", }} />
      </div>

      <div className='vh-100' 
        style={{...fieldBlock[fieldView][2], ...{position: 'relative'}}}>
        <TextArea 
          data={{ 
            activeNote: activeNote, 
            placeholder:"Answers", 
            name: "answers", }} />
        <div 
          style={{ position:'absolute', top: '45%',left: -12,borderRadius: 3, padding: '6px 2px', backgroundColor: 'black', color: 'white', cursor: 'pointer'}}
          onClick={ ()=> changeFieldView('userInput')}
        >{expandDir}</div>
      </div>

      </Row>
      </Container>
  )
}

export default TextAreas;