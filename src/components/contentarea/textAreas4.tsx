

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export function TextAreas4(props: {activeNote: number}){
  const [activeNote, setActiveNote] = useState(0);

  useEffect( ()=>{ setActiveNote( props.activeNote ); },[props])

  return(
    <Container fluid className='px-0 mx-0' id="textArea4">
      <Row className='no-gutters'>
          <div className='textarea'>
            <TextArea data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} />
          </div>
      </Row>
      </Container>
  )
}

export default TextAreas4;