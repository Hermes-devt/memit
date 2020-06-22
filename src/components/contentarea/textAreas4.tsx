

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas4(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{
    setActiveNote( props.activeNote );
  },[props])

  return(
    <Container fluid>
      <Row className='no-gutters'>
        <Col>
          <div className='' style={{ ...{width: '100%', height: '100vh', position: 'relative'}}}>
            <TextArea 
              data={{ 
                activeNote: activeNote,
                placeholder:"Type your answers here", 
                name: "questions" }} 
              />
          </div>
        </Col>
      </Row>
      </Container>
  )
}

export default TextAreas4;