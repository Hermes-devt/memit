

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas(props:any){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{
    setActiveNote( props.data.activeNote );
  },[props])


  return(
    <Container fluid >
      <Row className='no-gutters'>
        <Col>
            <div className='' 
              style={{ ...{width: '100%', height: '100vh', position: 'relative'}}}>
            <TextArea 
              data={{ 
                activeNote: activeNote,
                placeholder:"Type your answers here", 
                name: "questions" }} />
          </div>
        </Col>

        <Col >
          <div className='' 
            style={{ position: 'relative', width: '100%', height: '100%' }}>
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

export default TextAreas;