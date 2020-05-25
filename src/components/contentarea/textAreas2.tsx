

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas2(props:any){
  const [activeNote, setActiveNote] = useState(0);
  // const [fieldView, setFieldView] = useState(0);
  // const [expandDir, setExpandDir] = useState('<');

  useEffect( ()=>{
    setActiveNote( props.data.activeNote );
  },[props])


  const onNavbarExpand = ()=>{
    let char = props.data.navbarExtended === '<' ? '>' : '<' 
    props.onExtendVerticalbar(char);
  }

  return(
    <Container fluid style={{padding: 0, width: props.data.navbarExtended === '<' ? '84%' : '96%' }} >
      <Row className='no-gutters'>
        <Col>
            <div className='' 
              style={{ ...{width: '100%', height: '70vh', position: 'relative'}}}>
            <TextArea 
              data={{ 
                activeNote: activeNote,
                placeholder:"Type your answers here", 
                name: "questions" }} />
            <div style={{ position:'absolute', top: '50%', left: -7, padding: '6px 2px', backgroundColor: 'black', color: 'white', cursor: 'pointer'}}
              onClick={onNavbarExpand}
            >{props.data.navbarExtended}</div>
          </div>

          <div className='vh-20' 
            style={{...{width: '100%', height: '30vh', position: 'relative'}}}>
            <TextArea style={{backgroundColor: ''}} 
              data={{ 
                activeNote: activeNote, 
                placeholder:"User input", 
                tabIndex: -1, 
                name: "userInput", }} />
          </div>
        </Col>
        <Col className=''>
          <div className='' 
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <TextArea 
              data={{ 
                activeNote: activeNote, 
                placeholder:"Answers", 
                name: "answers", }} />
          </div>
        </Col>


      </Row>
      </Container>
  )
}

export default TextAreas2;