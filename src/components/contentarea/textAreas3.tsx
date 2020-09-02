

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas3(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{ setActiveNote( props.activeNote ); },[props])


  return(
    <Container fluid className='px-0 mx-0' id="textArea3"> 
      <Row className='no-gutters'>
        <Col>
            <div className='textareas' >
            <TextArea 
              data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} />
          </div>

        </Col>
        <Col className=''>
          <div className='textareas'>
            <TextArea 
              data={{ activeNote: activeNote, placeholder:"Answers", name: "answers", }} />
          </div>
        </Col>


      </Row>
      </Container>
  )
}

export default TextAreas3;