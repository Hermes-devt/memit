
import React, {CSSProperties} from 'react';
import Scheduler from './scheduler';
import {Container, Row, Col} from 'react-bootstrap';
import {ReactComponent as Clockcss} from '../../IMG/clock1.svg';

export const Navbar = (props:any):any =>{
  return(
    <Container fluid style={container}>
      <Row>
        <Col className="d-none d-md-block">
          <div style={{width: '75px', height: '75px', position: 'absolute', left: 30, top: 25}}> <Clockcss /> </div>
        </Col>
        <Col className="col-xs-12 col-sm-10 col-md-8">
          <h1 className='d-none d-md-block text-center'>Repeat Learnings</h1>
          {/* <h1 className='d-none d-md-block text-center'>Memory repeats</h1> */}
          <h3 className='d-sm-12 d-md-none text-center'>Repeat Learnings</h3>
          <Scheduler />
        </Col>
        <Col className="d-none d-sm-block">
          <div style={{width: '75px', height: '75px', position: 'absolute', right: 30, top: 25, transform: 'rotateY(180deg)'}}> <Clockcss /> </div>
        </Col>
      </Row>
    </Container>
  )
}

const container: CSSProperties = {
  backgroundColor: '#242424',
  color: 'orange',
  paddingBottom: 10,
  marginBottom: 1,
  borderBottom: '1px solid #242424',
}
 
export default Navbar;