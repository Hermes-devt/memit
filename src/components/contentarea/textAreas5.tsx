

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas2(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{ setActiveNote( props.activeNote); },[props])

  return(
    <Container fluid className='px-0 mx-0' id="textArea5">
      <Row className='no-gutters'>
        <div className='textarea1'>
          <TextArea 
            data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} />
        </div>

        <div className='textarea2'>
          <TextArea
            data={{ activeNote: activeNote, placeholder:"User input", tabIndex: -1, name: "userInput", }} />
        </div>
        <div className='textarea3'>
          <TextArea 
            data={{ activeNote: activeNote, placeholder:"Answers", name: "answers", }} />
        </div>
      </Row>
      <Row>

      </Row>
      </Container>
  )
}

export default TextAreas2;