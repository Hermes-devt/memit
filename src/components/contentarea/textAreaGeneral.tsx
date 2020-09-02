

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import '../../CSS/textareas.scss';

export function TextAreaGeneral(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{ setActiveNote( props.activeNote); },[props])

  return(
    <Container fluid className='px-0 mx-0' id="textareaGeneral">
      <Row className='no-gutters'>
        <Col>
            <div className=''>
            <TextArea 
              data={{ 
                activeNote: activeNote,
                placeholder:"Type your questions here", 
                name: "questions" }} />
          </div>

          <div className=''>
            <TextArea
              data={{ 
                activeNote: activeNote, 
                placeholder:"User input", 
                tabIndex: -1, 
                name: "userInput", }} />
          </div>
        </Col>
        <Col>
          <div className=''>
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

export default TextAreaGeneral;


