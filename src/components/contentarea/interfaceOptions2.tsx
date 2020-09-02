import React from 'react';
import TextAreas1 from './textAreas1';
import TextAreas2 from './textAreas2';
import TextAreas3 from './textAreas3';
import TextAreas4 from './textAreas4';
import TextAreas5 from './textAreas5';

import TextArea from './TextArea';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import UserInput from './userInput';
import '../../CSS/textareas.scss';

interface Props {
  layout: number,
  activeNote: number,
  forceUpdate?: any;
  forceIt?: any,
}

export function InterfaceOptions2({layout, activeNote}: Props){
  const [activeNote2, setActiveNote] = useState(0);

  useEffect( ()=>{ 
    setActiveNote(activeNote ); 
  },[layout, activeNote])

  return ( <span id="interfaceContainer">
    {layout === 1 && <Container fluid className='px-0 mx-0' id="textArea1">
      <Row className='no-gutters'>
        <Col> <div className='textarea'> 
          <TextArea data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} /> </div>
        </Col>
        <Col > <div className='textarea'> <UserInput style={{backgroundColor: ''}} 
            data={{ activeNote: activeNote, placeholder: "User input", tabIndex: -1, name: "userInput", }} /> </div>
        </Col>
        <Col className=''>
          <div className='textarea' > <TextArea data={{ activeNote: activeNote, placeholder:"Answers", name: "answers", }} /> </div>
        </Col>
      </Row>
    </Container>
    }

    {layout === 2 && <TextAreas2 activeNote={activeNote} /> }
    {layout === 2 && <Container fluid className='px-0 mx-0' id="textArea2">
      <Row className='no-gutters'>
        <Col>
            <div className='textarea1'>
            <TextArea 
              data={{ activeNote: activeNote, placeholder:"Type your questions here", name: "questions" }} />
          </div>

          <div className='textarea2'>
            <TextArea data={{ activeNote: activeNote, placeholder:"User input", tabIndex: -1, name: "userInput", }} />
          </div>
        </Col>
        <Col>
          <div className='textarea3'>
            <TextArea data={{ activeNote: activeNote, placeholder:"Answers", name: "answers", }} />
          </div>
        </Col>
      </Row>
      </Container>
    }

    {layout === 3 && <TextAreas3 activeNote={activeNote} /> }
    {layout === 4 && <TextAreas4 activeNote={activeNote} /> }
    {layout === 5 && <TextAreas5 activeNote={activeNote} /> }
  </span>);

}
 
export default InterfaceOptions2;