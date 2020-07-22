
import React, {CSSProperties} from 'react';
import Scheduler from './scheduler';
import {Container, Row, Col} from 'react-bootstrap';
import {ReactComponent as Clockcss} from '../../IMG/clock1.svg';
// import {ReactComponent as BG} from '../../IMG/topbarBG.svg';
// import img from '../../IMG/image20.png';
import img from '../../IMG/sky2.jpg';

export const Navbar = ()=>{
  return(
    <Container fluid style={container}>
      <Row>
        <Col className="d-none d-md-block">
          <div style={{height: '75%', position: 'absolute', left: '-5%', top: '15%'}}> <Clockcss /> </div>
        </Col>
        <Col className="col-xs-12 col-sm-10 col-md-8">
          <h1 className='d-none d-md-block text-center' style={{ fontSize: '2.5em'}}>Repeat Learnings</h1>
          <h3 className='d-sm-12 d-md-none text-center'>Repeat Learnings</h3>
          <Scheduler />
        </Col>
        <Col className="d-none d-sm-block">
          <div style={{height: '75%', position: 'absolute', right: '-5%', top: '15%', transform: 'rotateY(180deg)'}}> <Clockcss /> </div>
        </Col>
      </Row>
    </Container>
  )
}

const container: CSSProperties = {
  backgroundImage: "url(" + img + ")",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  color: 'silver',
  paddingBottom: 10,
  marginBottom: 1,
  borderBottom: '1px solid #242424',
}
 
export default Navbar;