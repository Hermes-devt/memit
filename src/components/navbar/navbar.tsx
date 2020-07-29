
import React from 'react';
import Scheduler from './scheduler';
import {Container, Row, Col} from 'react-bootstrap';
import {ReactComponent as Clockcss} from '../../IMG/clock1.svg';
import '../../CSS/topbar.scss';

export const Navbar = ()=>{
  return(
    <Container fluid id='topbar'>
      <Row>

        <Col className="d-none d-md-block">
          <div className="clockLeft"> <Clockcss /> </div>
        </Col>

         <Col className="col-xs-12 col-sm-10 col-md-8"> 
          <h1>Repeat Learnings</h1>
          <Scheduler />
        </Col>

        <Col className="d-none d-sm-block">
          <div className="clockRight" > <Clockcss /> </div>
        </Col>

      </Row>
    </Container>
  )
}
export default Navbar;