

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas2(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{
    setActiveNote( props.activeNote);
  },[props])

  return(
    <Container fluid>
      <Row className='no-gutters'>
        <Col>
            <div className='' 
              style={{ ...{width: '100%', height: '70vh', position: 'relative'}}}>
            <TextArea 
              data={{ 
                activeNote: activeNote,
                placeholder:"Type your questions here", 
                name: "questions" }} />
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