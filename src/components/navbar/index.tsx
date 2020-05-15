
import React, {CSSProperties} from 'react';
import Scheduler from './scheduler';
import clock from '../../IMG/clock.png'
import {Container, Row, Col} from 'react-bootstrap';
import Timer from './timer';

export const Navbar = ():any =>{
  return(
    <Container fluid style={{backgroundColor: 'lightblue', paddingBottom: 10, marginBottom: '1px', borderBottom: '1px solid #242424'}}>
      <Timer />
      <Row>
        <Col className="d-none d-md-block">
          <img style={clock1} src={clock} alt="clock" />
        </Col>
        <Col className="col-xs-12 col-sm-10 col-md-8">
          <h1 className='d-none d-md-block text-center'>Repeated Scheduling Software</h1>
          <h3 className='d-sm-12 d-md-none text-center'>Repeated Scheduling Software</h3>
          <Scheduler />
        </Col>
        <Col className="d-none d-sm-block">
          <img style={styling.clock2} src={clock} alt="clock" />
        </Col>
      </Row>
    </Container>
  )
}
// color: 'white', backgroundColor: '#242424',
const clock1: CSSProperties = {
  position: 'relative',
  top: '10px',
  width: '100px', 
}

const styling = {
  clock2: {
    width: 100, 
    position: 'absolute', 
    right: '20px',
    top: '10px', 
    transform: 'rotateY(180deg)'
  } as React.CSSProperties
}
 
export default Navbar;