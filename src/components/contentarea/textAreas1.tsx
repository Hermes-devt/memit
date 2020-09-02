

import React, {} from 'react';
import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import UserInput from './userInput';

interface Props{
  activeNote: number;
  forceUpdate?: any;
}
// export function TextAreas(props: {activeNote: number, forceIt?: any}){
export function TextAreas(props: Props){
  const [activeNote, setActiveNote] = useState(0);
  useEffect( ()=>{ setActiveNote( props.activeNote ); },[props])

  return(
    <Container fluid className='px-0 mx-0' id="textArea1">
      <Row className='no-gutters'>
        <Col>
            <div className='textarea'>
            <TextArea data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} />
          </div>
        </Col>

        <Col >
          <div className='textarea'>
            <UserInput forceUpdate={props.forceUpdate} data={{ activeNote: activeNote, placeholder: "User input", tabIndex: -1, name: "userInput", }} />
          </div>
        </Col>
        <Col className=''>
          <div className='textarea' >
            <TextArea 
              data={{ activeNote: activeNote, placeholder:"Answers", name: "answers", }} />
          </div>
        </Col>


      </Row>
      </Container>
  )
}

export default TextAreas;